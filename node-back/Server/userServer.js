const express = require('express')

const handelers = require('../db handeling/sql_handelers');

const sqlUser = require('../db handeling/sqlUser')

const app = express();
const router = express.Router();


// Get all users : DONE
router.route('/users').get((req, res) => {
    sqlUser.getUsers((err, users) => {
        if (err)
            console.log(err);
        else {
            console.log(users)
            return res.json(users);  
        }
    });
});

//Get user By Id
router.route('/users/:id').get((req, res) => {
    let id = req.params.id; 
    sqlUser.getUserById(id, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});

//Get by status
router.route('/users/status/:status').get((req, res) => {
    status = req.params.status 
    sqlUser.getByStatus(status, (err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});

//Change user status
router.route('/users/changestatus').post((req, res) => {
    let infos = req.body;
    sqlUser.changeStatus(infos, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});



module.exports = router;
