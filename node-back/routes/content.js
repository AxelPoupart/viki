const express = require('express')
const router = express.Router();

const taches = require('./taches.json')

router.get('/taches', (req,res) => res.json(taches));




module.exports = router;