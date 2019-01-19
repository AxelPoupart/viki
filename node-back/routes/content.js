const express = require('express')
const router = express.Router();

const actionServer = require('../Server/actionServer')
const appServer = require('../Server/appServer')
const vmServer = require('../Server/vmServer')
const userServer = require('../Server/userServer')
const generalServices = require('../Server/generalServices')

router.get('/', (req,res,next) => {console.log(req.session.id,req.session);res.send(req.session.auth);next()});

// Actions Back
router.use('/actionservice', actionServer )

// Vm Back
router.use('/vmservice', vmServer )

// Appli Back
router.use('/appservice', appServer )

// Users Back
router.use('/userservice', userServer )

// General Services
router.use('/services', generalServices);

module.exports = router;
