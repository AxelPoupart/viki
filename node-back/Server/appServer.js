const express = require('express')
const router = express.Router();

const sqlAppli = require('../db handeling/sqlAppli')

// Query all applications from database and send them to the front
router.get('/applis', (req, res) => {
    sqlAppli.get_all_applis((err, applis) => {
        if (err) throw err;

        return res.json(applis);
    });
});

// Send an application given its id
router.get('/applis/:_id', (req, res) => {
    let appId = req.params._id
    sqlAppli.getApplicationById(appId, (err, application) => {
        if (err) {
            console.log(err);
            return res.send({ success: false, msg: "The query of the required application failed" })
        }
        if (application) {
            return res.send({
                success: true,
                application: application[0]
            })
        }
    })
})

// Add a new application to the database
router.post('/add', (req, res) => {
    let appli = req.body

    sqlAppli.post_new_appli(appli, (err) => {
        if (err) return res.json({ success: false, msg: "The operation failed" });

        return res.json({ success: true, msg: "The application was added successfully", appli: JSON.stringify(appli) })
    });
});

router.delete('/applis', (req, res) => {
    let appId = req.body.appId
    sqlAppli.deleteCoupledVms(appId, (err) => {
        if (err) {
            console.log('Error while deleting coupled machines');
            console.log(err);

            return res.json({ success: false, msg: 'The request could not proceed' })
        };
        sqlAppli.delete_appli(appId, (err) => {
            if (err) {
                console.log('Error while deleting an application');
                console.log(err)
                return res.json({ success: false, msg: 'The request could not proceed' })
            };
            return res.json({ success: true, msg: 'The application was deleted successfully' })
        })
    })
})

// Collect paired machines to a given application
router.get('/pairs/:_id', (req, res) => {
    let appId = req.params._id
    sqlAppli.getPairedMachines(appId, (err, pairedMachines) => {
        if (err) {
            console.log('Error while querying paired machines');
            console.log(err)
            return res.json({ success: false, msg: 'The request could not proceed' })
        }
        return res.json({ success: true, pairedMachines: pairedMachines })
    })
})

router.put('/applis', (req, res) => {
    let appUpdate = req.body;
    sqlAppli.updateApplication(appUpdate, (err) => {
        if (err) {
            console.log('Error while updating the application');
            console.log(err)
            return res.json({ success: false, msg: 'The request could not proceed' })
        }
        sqlAppli.updatePairs(appUpdate, (err) => {
            if (err) {
                console.log('Error while updating paired machines');
                console.log(err)
                return res.json({ success: false, msg: 'The request could not proceed' })
            }
            res.json({ success: true, msg: 'Application updated successfully' })
        })
    })
})

module.exports = router