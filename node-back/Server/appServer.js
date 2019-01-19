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