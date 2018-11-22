const express = require('express')
const router = express.Router();

const AppCreation = require('./AppCreation')

// const taches = require('./taches.json');

router.get('/', (req,res,next) => {console.log(req.session.id,req.session);res.send(req.session.auth);next()});

router.use('/applicationservice/newapp', AppCreation)

module.exports = router; 