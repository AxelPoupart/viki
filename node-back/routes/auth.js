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
            
            req.session.auth=true;
            res.json(user)
            
        } else {
            res.status(400).send({ message: 'Username or password is incorrect' })
        }
    }
    catch (error) { console.log(error) ;res.status(400).send({ message: 'Authentication error of some kind' })};
    console.log(req.session.id)
});

router.get('/authenticate', (req,res) => res.send("ca marche aussi"));

module.exports = router;
