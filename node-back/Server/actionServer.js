import express from 'express';


const app = express();
const router = express.Router();


router.route('/actionservice/actions/add').post((req, res) => {
    let action = req //transformer req pour que ca colle
    post_new_action(action, (err, res) => {
        res.status(200).json({'action': 'Added successfully!'});
    })
    .catch(err => {
        res.status(400).send('Failed to create new record');
    });
});


router.route('/actionservice/actions').get((req, res) => {
    get_all_actions((err, actions) => {
        if (err)
            console.log(err);
        else {
            res.status(200).json({'action': 'Added successfully!'});
            res.json(actions);
        }
    });
});


router.route('/actionservice/action/:id').get((req, res) => {
    let id = req.params.id; //à priori c'est ça mais pas sûr, à tester
    get_action_by_id(id, (err, action) => {
        if (err)
            console.log(err);
        else
            res.json(action);
    });
});

router.route('/actionservice/actions/user/:user').get((req, res) => {
    let userId = req.params.user; //à priori c'est ça mais pas sûr, à tester
    get_actions_by_user(userId, (err, actions) => {
        if (err)
            console.log(err);
        else
            res.json(actions);
    });
});

router.route('/actionservice/actions/appli/:appli').get((req, res) => {
    let appliId = req.params.appli; //à priori c'est ça mais pas sûr, à tester
    get_actions_by_appli(appliId, (err, actions) => {
        if (err)
            console.log(err);
        else
            res.json(actions);
    });
});

router.route(`/actionservice/actions/search/:term`).get((req, res) => {
    const term = req.params.term; //recherche par lettres dans le 'title' (classique search bar)
    get_actions_by_search(term, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    });
});
