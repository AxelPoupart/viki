const express = require('express')
const router = express.Router();

const taches = require('./taches.json');

router.get('/', (req,res,next) => {console.log(req.session.id,req.session);res.send(req.session.auth);next()});

router.get('/taches', (req,res) => {console.log("ca passe session");res.json(taches);});




module.exports = router;