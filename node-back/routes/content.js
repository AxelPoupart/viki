const express = require('express')
const router = express.Router();

const AppCreation = require('../Server/AppCreation')
const ActionService =require ('../Server/actionServer')
const AppliService =require ('../Server/applicationServer')
const VmService =require ('../Server/vmServer')
// const taches = require('./taches.json');

router.get('/', (req,res,next) => {console.log(req.session.id,req.session);res.send(req.session.auth);next()});

router.use('/applicationservice/newapp', AppCreation)
router.use('/actionservice', ActionService)
router.use('/applicationservice', AppliService)
router.use('/vmservice', VmService)
module.exports = router; 