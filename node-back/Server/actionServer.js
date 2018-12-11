const express = require('express')

const handelers = require('../db handeling/sql_handelers');

const sqlAction = require('../db handeling/sqlAction')

const app = express();
const router = express.Router();

// Add a new Action : DONE
router.route('/actions/add').post((req, res) => {
    console.log(req.body);
    let action = req.body 
    sqlAction.post_new_action(action, (err) => {
        console.log("Post presque done");
        console.log(action);
        return res.json(action)
    });
});

// Get all actions : DONE
router.route('/actions').get((req, res) => {
    sqlAction.get_all_actions((err, actions) => {
        console.log(actions)
        return res.json(actions);
    });
});


router.route('/actions/delete').post((req, res) => {
    console.log(req.body);
    let Id = req.body.Id
    sqlAction.delete_action(Id, (err) => {
        console.log("Delete presque done");
        return res.json(req.body)
    });
});










router.route('/action/:id').get((req, res) => {
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


module.exports = router;
