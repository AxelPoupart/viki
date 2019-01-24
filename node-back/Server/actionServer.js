const sqlAction = require('../db handeling/sqlAction')
const express = require('express')
const router = express.Router();

// Add a new Action : DONE
router.route('/actions/add').post((req, res) => {
    let action = req.body 
    sqlAction.post_new_action(action, (err) => {
        if (err) throw err
        return res.json(action)
    });
});

// Get all actions : DONE
router.route('/actions').get((req, res) => {
    sqlAction.get_all_actions((err, actions) => {
        if (err)
            console.log(err);
        else {
            return res.json(actions);  
        }
    });
});

// Delete an action by Id
router.route('/actions/delete').post((req, res) => {
    let Id = req.body.Id
    sqlAction.delete_action(Id, (err) => {
        return res.json(req.body)
    });
});

//Change action status
router.route('/actions/changestatus').post((req, res) => {
    let infos = req.body;
    sqlAction.changeStatus(infos, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});


// Get actions by status : DONE
router.route('/actions/status/:status').get((req, res) => {
    let status = req.params.status;
    sqlAction.getActionsByStatus(status, (err, actions) => {
        if (err)
            console.log(err);
        else {
            return res.json(actions);  
        }
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
