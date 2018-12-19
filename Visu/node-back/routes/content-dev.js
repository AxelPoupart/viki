const express = require('express')
const router = express.Router();

const ActionServer = require('../Server/actionServer')
const AppliServer = require('../Server/appliServer')
const VmServer = require('../Server/vmServer')
const UserServer = require('../Server/userServer')
const Chat = require('../model_mongo/Chat')


router.get('/', (req,res,next) => {console.log(req.session.id,req.session);res.send(req.session.auth);next()});



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
