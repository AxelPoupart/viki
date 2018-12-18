const express = require('express')
const router = express.Router();
const app = express();

const AppCreation = require('./AppCreation')
const ActionServer = require('../Server/actionServer')
const ApplicationServer = require('../Server/applicationServer')
const VmServer = require('../Server/vmServer')
<<<<<<< HEAD
=======
const sqlAction = require('../db handeling/sqlAction')
>>>>>>> 26d11db5a0fac4895258f09f2360a16a8fbc8efb

// const taches = require('./taches.json');

router.get('/', (req, res, next) => {
    console.log(req.session.id, req.session);
    res.send(req.session.auth);
    next()
});
// Methods to create new apps
router.use('/applicationservice/newapp', AppCreation)
// Methods related to 'Actions'
router.use('/actionservice', ActionServer)
// app.use('/actionservice', router)

router.use('/vmservice', VmServer)


router.get('/try', (req, res) => {
    console.log("try ok")
    return res.json("c'est ok")
});

router.route('/actions').get((req, res) => {
    sqlAction.get_all_actions((err, actions) => {
        if (err)
            console.log(err);
        else {
            res.status(200).json({ 'action': 'get successfully!' });
            res.json(actions);
        }
    });
});

<<<<<<< HEAD
router.use('/newapp', AppCreation)

router.use('/actionservice', ActionServer )
app.use('/actionservice', router)

router.use('/vmservice', VmServer )


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
=======
module.exports = router;
>>>>>>> 26d11db5a0fac4895258f09f2360a16a8fbc8efb
