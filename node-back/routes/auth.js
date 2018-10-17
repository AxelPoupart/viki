const express = require('express')
const router = express.Router();
const users = require('../auth/users.json')

router.post('/authenticate', (req, res) => {
    try {
        console.log('got auth req')
        username = req.body.username;
        password = req.body.password;

        const user = users.find(
            u => u.name == username && u.password == password
        );
        if (user) {
            console.log('SUCCESS')
            res.json(user)
        } else {
            res.status(400).send({ message: 'Username or password is incorrect' })
        }
    }
    catch (error) { console.log(error) };
});

module.exports = router;