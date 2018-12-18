const express = require('express')

const handelers = require('../db handeling/sql_handelers');

const sqlAppli = require('../db handeling/sqlAppli')

const app = express();
const router = express.Router();




// Add a new Appli : DONE
router.route('/applis/add').post((req, res) => {
    console.log(req.body);
    let appli = req.body 
    sqlAppli.post_new_appli(appli, (err) => {
        console.log("Post presque done");
        console.log(appli);
        return res.json(appli)
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










router.route('/vmservice/vms/add').post((req, res) => {
    let vm = req //transformer req pour que ca colle
    post_new_application(vm, (err, res) => {
        res.status(200).json({'vm': 'Added successfully!'});
    })
    .catch(err => {
        res.status(400).send('Failed to create new record');
    });
});


router.route('/vmservice/vms').get((req, res) => {
    get_all_applications((err, vms) => {
        if (err)
            console.log(err);
        else {
            res.status(200).json({'vm': 'get successfully'});
            res.json(applications);
        }
    });
});


router.route('/vmservice/vms/:id').get((req, res) => {
    let id = req.params.id; //à priori c'est ça mais pas sûr, à tester
    get_application_by_id(id, (err, vm) => {
        if (err)
            console.log(err);
        else
            res.json(vm);
    });
});

router.route('/vmservice/vms/appli/:appli').get((req, res) => {
    let appliId = req.params.appli; //à priori c'est ça mais pas sûr, à tester
    get_applications_by_appli(appliId, (err, applications) => {
        if (err)
            console.log(err);
        else
            res.json(applications);
    });
});

router.route(`/vmservice/vms/search/:term`).get((req, res) => {
    const term = req.params.term; //recherche par lettres dans le 'title' (classique search bar)
    get_applications_by_search(term, (err, applications) => {
        if (err)
            console.log(err);
        else
            res.json(applications);
    });
});

module.exports = router;