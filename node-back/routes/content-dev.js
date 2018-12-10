const express = require('express')
const router = express.Router();
const app = express();

const AppCreation = require('./AppCreation')
const ActionServer = require('../Server/actionServer')
const ApplicationServer = require('../Server/applicationServer')
const VmServer = require('../Server/vmServer')
const Chat = require('../model_mongo/Chat')


router.get('/', (req,res,next) => {console.log(req.session.id,req.session);res.send(req.session.auth);next()});

router.use('/applicationservice/newapp', AppCreation)

router.use('/newapp', AppCreation)


// Actions Back
router.use('/actionservice', ActionServer )
app.use('/actionservice', router)

// Vm Back
router.use('/vmservice', VmServer )
app.use('/vmservice', router)




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
            res.status(200).json({'chat': 'Added successfully!'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});


module.exports = router;
