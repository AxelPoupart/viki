const db = require('./start_cnx');

exports.get_all_campuses = (callback) => {
    let query = 'SELECT * FROM `campuses`'
    db.query(query, callback)
}

exports.get_all_domains = (callback) => {
    let query = 'SELECT * FROM `domains`'
    db.query(query, callback)
}

exports.get_domain_by_label = (label, callback) => {
    let query = 'SELECT * FROM `domains` WHERE `label` = ?'
    db.query(query, [label], callback)
}

exports.get_machine_by_label = (label, callback) => {
    let query = 'SELECT * FROM `virtualMachines` WHERE `label` = ?'
    db.query(query, [label], callback)
}