const db = require('./start_cnx');

// Select all actions
exports.get_all_actions = (callback) => {
    let query = 'SELECT * FROM `Actions`';
    console.log(query);
    return db.query(query, callback)
}

// Post a new action
exports.post_new_action = (action, callback) => {
    let set = action
    let query = "INSERT INTO `Actions` SET ?";
    console.log(query);
    return db.query(query, [set], callback)
}


// Delete an action
exports.delete_action = (Id, callback) => {
    let set = {_id : Id}
    let query = "DELETE FROM `Actions` WHERE `_id` = ?";
    console.log(query);
    return db.query(query, Id, callback)
}