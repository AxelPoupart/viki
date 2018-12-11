const handelers = require('../db handeling/sql_handelers');
const express = require('express')
const router = express.Router()

router.get('/campuses', (req, res) => {
    console.log('GET CAMPUSES')
    handelers.get_all_campuses((err, results) => {
        if (err) throw err;
        let _res = results.map(campus => campus['CampusName'])
        res.json({
            success: true,
            campuses: _res
        })
    })
})

router.get('/domains', (req, res) => {
    handelers.get_all_domains((err, results) => {
        if (err) throw err;
        let domains = {}, subDomains = {};
        results.forEach(dom => {
            if (dom['_id'] === dom['ParentID']) {
                domains[dom['_id']] = dom['Label'];
                subDomains[dom['Label']] = []
            } else {
                subDomains[domains[dom['ParentID']]].push(dom['Label']);
            }
        })
        res.json({
            domains: domains,
            subDomains: subDomains
        })
    })
})

router.post('/createapp', (req, res) => {
    let application = req.body;
    handelers.new_application(application, (err, result) => {
        if (err) throw err;
        if (result) {
            return res.json({
                success: true,
                msg: 'La nouvelle application a été crée avec succés'
            })
        }
        return res.json({
            success: false,
            msg: "La création d'une nouvelle application n'a pas abouti"
        })
    })
})

module.exports = router;