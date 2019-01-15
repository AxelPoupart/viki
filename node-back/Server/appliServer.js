const express = require('express')

const handelers = require('../db handeling/sql_handelers');

const sqlAppli = require('../db handeling/sqlAppli')

const router = express.Router();

router.route('/add').post((req, res) => {
    let appli = req.body 
    sqlAppli.post_new_appli(appli, (err) => {
        if (err) return res.send({msg: "The operation failed"});
        return res.json({msg:"The application was added successfully", appli: JSON.stringify(appli)})
    });
});

// Get all Applis : DONE
router.route('/applis').get((req, res) => {
    sqlAppli.get_all_applis((err, applis) => {
        console.log(applis)
        return res.json(applis);
    });
});

// Delete an Appli : DONE
router.route('/applis/delete').post((req, res) => {
    console.log(req.body);
    let Id = req.body.Id
    sqlAppli.delete_appli(Id, (err) => {
        console.log("Delete presque done");
        return res.json(req.body)
    });
});

// Get Applis by searching : 
router.route('/applis/search/:term').get((req, res) => {
    var term = req.params.term;
    sqlAppli.get_applis_search(term, (err, applis) => {
        console.log(applis)
        return res.json(applis);
    });
});









module.exports = router;