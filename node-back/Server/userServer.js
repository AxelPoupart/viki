const express = require('express')

const handelers = require('../db handeling/sql_handelers');

const sqlUser = require('../db handeling/sqlUser')
const bcrypt =require('bcryptjs');
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

//add user
router.route('/users/new_user').post((req, res) => {
    let info = req.body;
    console.log('CREATE NEW USER')
    email = info.email;
    password = info.password;
    hash = bcrypt.hashSync(password, 8);
    user={"mail":email,"hash":hash}
    sqlUser.new_user(user, (err) => {
        if (err)
            console.log(err);
        else console.log("new user " + user)    
        
    });
});


module.exports = router;
