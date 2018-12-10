const db = require('./start_cnx');

exports.get_all_campuses = (callback) => {
    let query = 'SELECT * FROM `Campuses`'
    db.query(query, callback)
}

exports.get_all_domains = (callback) => {
    let query = 'SELECT * FROM `Domains`'
    db.query(query, callback)
}

get_domain_by_label = (label, callback) => {
    let query = 'SELECT * FROM `Domains` WHERE `Label` = ?'
    db.query(query, [label], callback)
}

get_campus_by_name = (name, callback) => {
    let query = 'SELECT * FROM `Campuses` WHERE `CampusName` = ?'
    db.query(query, [name], callback)
}

exports.get_privileges_by_userid = (id, callback) => {
    let query = 'SELECT p.Label FROM `Privileges` as p JOIN `UsersPrivileges` AS up ON p._id=up.PrivilegesID WHERE up.UserID = ' + toString(id)
    db.query(query, [name], callback)
}

exports.new_application = (application, callback) => {
    let set = {
        Code: application.appCode,
        Label: application.appLabel,
        DomainID: false,
        CampusID: false
    }
    get_domain_by_label(application.appSubDomain, (err, result) => {
        if (err) throw err;
        set.DomainID = result[0]['_id'];
        get_campus_by_name(application.appCampus, (err, result) => {
            if (err) throw err;
            set.CampusID = result[0]['_id'];
            query = 'INSERT INTO `Applications` SET ?';
            db.query(query, [set], callback)
        })  
    })
}