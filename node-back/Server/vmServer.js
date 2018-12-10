import express from 'express';


const app = express();
const router = express.Router();


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