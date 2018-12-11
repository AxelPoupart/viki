const express = require('express');


const app = express();
const router = express.Router();


router.route('/applicationservice/applications/add').post((req, res) => {
    let application = req //transformer req pour que ca colle
    post_new_application(application, (err, res) => {
        res.status(200).json({'application': 'Added successfully!'});
    })
    .catch(err => {
        res.status(400).send('Failed to create new record');
    });
});


router.route('/applicationservice/applications').get((req, res) => {
    get_all_applications((err, applications) => {
        if (err)
            console.log(err);
        else {
            res.status(200).json({'application': 'get successfully'});
            res.json(applications);
        }
    });
});


router.route('/applicationservice/applications/:id').get((req, res) => {
    let id = req.params.id; //à priori c'est ça mais pas sûr, à tester
    get_application_by_id(id, (err, application) => {
        if (err)
            console.log(err);
        else
            res.json(application);
    });
});

router.route('/applicationservice/applications/user/:user').get((req, res) => {
    let userId = req.params.user; //à priori c'est ça mais pas sûr, à tester
    get_applications_by_user(userId, (err, applications) => {
        if (err)
            console.log(err);
        else
            res.json(applications);
    });
});

router.route('/applicationservice/applications/appli/:appli').get((req, res) => {
    let appliId = req.params.appli; //à priori c'est ça mais pas sûr, à tester
    get_applications_by_appli(appliId, (err, applications) => {
        if (err)
            console.log(err);
        else
            res.json(applications);
    });
});

router.route(`/applicationservice/applications/search/:term`).get((req, res) => {
    const term = req.params.term; //recherche par lettres dans le 'title' (classique search bar)
    get_applications_by_search(term, (err, applications) => {
        if (err)
            console.log(err);
        else
            res.json(applications);
    });
});

module.exports = router; 