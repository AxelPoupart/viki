const express = require('express')
const router = express.Router();
const users = require('../auth/users.json')

router.post('/authenticate', (req, res) => {
    
    try {
        username = req.body.username;
        password = req.body.password;

        const user = users.find(
            u => u.name == username && u.password == password
        );
        if (user) {
            req.session.user_id = user.id;
            req.session.auth=true;
            req.session.username = user.name;
            
            req.session.privilege  = user.privileges;
            res.json(user)
             
            
        } else {
            res.status(400).send({ message: 'Username or password is incorrect' })
        }
    }
    catch (error) { console.log(error) ;res.status(400).send({ message: 'Authentication error of some kind' })};
    console.log(req.session.privilege+req.session.id)
});

router.get('/authenticate', (req, res) => {
    if (req.session.auth){
        
        user = {
            auth:req.session.auth,
            privileges: req.session.privilege,
            username: req.session.username

        }
        console.log(user)
        res.json(user)
    }else {
        res.status(400).send({ message: 'Not Logged in' })
    }
});


module.exports = router;
