const express = require('express')
const router = express.Router();

const actionServer = require('../Server/actionServer')
const appServer = require('../Server/appServer')
const vmServer = require('../Server/vmServer')
const userServer = require('../Server/userServer')
const generalServices = require('../Server/generalServices')
const Chat = require('../model_mongo/Chat')

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

// Chat-Back
router.route('/chat-back').get((req, res) => {
    Chat.find((err, chats) => {
        if (err)
            console.log(err);
        else {return res.json(chats);}
    });
});

router.route('/chat-back/add').post((req, res) => {
    let chat = new Chat(req.body);
    chat.save()
        .then(chat => {
            res.status(200).json(chat);
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});


module.exports = router;
