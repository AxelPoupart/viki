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
    sqlAppli.getApplicationById(appId, (err, application)=>{
        if (err) {
            console.log(err);
            return res.send({success: false, msg:"The query of the required application failed"})
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
    sqlAppli.deleteCoupledVms(appId, (err)=>{
        if (err) {
            console.log('Error while deleting coupled machines');
            console.log(err);
            
            return res.json({ success: false, msg: 'The request could not proceed' })
        };
        sqlAppli.delete_appli(appId, (err) => {
            if (err) {
                console.log('Error while deleting an application');
                return res.json({ success: false, msg: 'The request could not proceed' })
            };
            return res.json({ success: true, msg: 'The application was deleted successfully' })
        })
    })
})

module.exports = router