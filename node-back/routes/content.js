const express = require('express')
const router = express.Router();

const AppCreation = require('./AppCreation')


const ActionServer = require('../Server/actionServer')
const AppliServer = require('../Server/appliServer')
const VmServer = require('../Server/vmServer')
const UserServer = require('../Server/userServer')
const Chat = require('../model_mongo/Chat')


// const taches = require('./taches.json');

router.get('/', (req,res,next) => {console.log(req.session.id,req.session);res.send(req.session.auth);next()});

router.use('/applicationservice/newapp', AppCreation)

router.use('/actionservice', ActionServer )

router.use('/vmservice', VmServer )



// Actions Back
router.use('/actionservice', ActionServer )


// Vm Back
router.use('/vmservice', VmServer )


// Appli Back
router.use('/appliservice', AppliServer )


// USers Back
router.use('/userservice', UserServer )



router.get('/try', (req,res) => {
    console.log("try ok")
    return res.json("c'est ok")
});


const sqlAction = require('../db handeling/sqlAction')

router.route('/actions').get((req, res) => {
    sqlAction.get_all_actions((err, actions) => {
        if (err)
            console.log(err);
        else {
            res.status(200).json({'action': 'get successfully!'});
            res.json(actions);
        }
    });
});

module.exports = router;
