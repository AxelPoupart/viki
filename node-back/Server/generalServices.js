const handelers = require('../db handeling/sql_handelers');
const express = require('express')
const router = express.Router()

router.get('/domains', (req, res) => {
    handelers.get_all_domains((err, results) => {
        if (err) throw err;
        let domains = {}, subDomains = {};
        results.forEach(dom => {
            if (dom['_id'] === dom['parentId']) {
                domains[dom['_id']] = dom['label'];
                subDomains[dom['label']] = []
            } else {
                subDomains[domains[dom['parentId']]].push(dom['label']);
            }
        })
        res.json({
            domains: domains,
            subDomains: subDomains
        })
    })
})

module.exports = router;