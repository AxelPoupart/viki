const db = require('./start_cnx');

// Select all applications
exports.get_all_applis = (callback) => {
    let query = 'SELECT * FROM `applications`';
    console.log(query);
    return db.query(query, callback)
}

// Post a new appli
exports.post_new_appli = (appli, callback) => {
    let set = appli
    let query = "INSERT INTO `applications` SET ?";
    console.log(query);
    return db.query(query, [set], callback)
}


// Delete a appli
exports.delete_appli = (Id, callback) => {
    let set = {_id : Id}
    let query = "DELETE FROM `applications` WHERE `_id` = ?";
    console.log(query);
    return db.query(query, Id, callback)
}

// Search a appli by term (Label or Comment)
exports.get_applis_search = (term, callback) => {
    const new_term = "%" + term + "%";
    let query = 'SELECT * FROM `applications` WHERE `Label` LIKE ? OR `Comment` LIKE ?';
    console.log(query);
    return db.query(query, [new_term, new_term], callback)
}