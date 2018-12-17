const express = require('express')
const router = express.Router();
const users = require('../auth/users.json')
const sql_user_handlers = require ('../db handeling/sqlUsers')

router.post('/authenticate', (req, res) => {
    
    try {
        username = req.body.username;
        password = req.body.password;

        const user = users.find(
            u => u.name == username && u.password == password
        );
        if (user) {
            sql_user_handlers.get_user_privileges(user.id, (err,res) => {
            if (err)
                console.log(err);
            else 
                req.session.privileges=res;
            })
            req.session.user_id = user.id;
            req.session.auth=true;
            req.session.username = user.username;
            res.json(user)
            
        } else {
            res.status(400).send({ message: 'Username or password is incorrect' })
        }
    }
    catch (error) { console.log(error) ;res.status(400).send({ message: 'Authentication error of some kind' })};
    console.log(req.session.id)
});

router.get('/authenticate', (req, res) => {
    if (req.session.auth){
        user = {
            id:req.session.id,
            privileges: req.session.privileges,
            username: req.session.username

        }
        res.json(user)
    }else {
        res.status(400).send({ message: 'Not Logged in' })
    }
});




module.exports = router;
