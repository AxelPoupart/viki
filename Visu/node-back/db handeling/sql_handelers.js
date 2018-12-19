const db = require('./start_cnx');

exports.get_all_campuses = (callback) => {
    let query = 'SELECT * FROM `campuses`'
    db.query(query, callback)
}

exports.get_all_domains = (callback) => {
    let query = 'SELECT * FROM `domains`'
    db.query(query, callback)
}

get_domain_by_label = (label, callback) => {
    let query = 'SELECT * FROM `domains` WHERE `label` = ?'
    db.query(query, [label], callback)
}

exports.new_application = (application, callback) => {
    let set = {
        code: application.appCode,
        label: application.appLabel,
        domainId: false,
        campus: application.appCampus,
        comment: application.comment
    }
    get_domain_by_label(application.appSubDomain, (err, result) => {
        if (err) throw err;
        set.domainId = result[0]['_id'];
        query = 'INSERT INTO `applications` SET ?';
        db.query(query, [set], callback)
    })
}