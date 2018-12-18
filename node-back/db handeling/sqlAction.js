const db = require('./start_cnx');

<<<<<<< HEAD



// Select all actions
exports.get_all_actions = (callback) => {
    let query = 'SELECT * FROM `actions`';
=======
// Select all actions
exports.get_all_actions = (callback) => {
    let query = 'SELECT * FROM `Actions`';
>>>>>>> 26d11db5a0fac4895258f09f2360a16a8fbc8efb
    console.log(query);
    return db.query(query, callback)
}

// Post a new action
exports.post_new_action = (action, callback) => {
    let set = action
<<<<<<< HEAD
    let query = "INSERT INTO `actions` SET ?";
=======
    let query = "INSERT INTO `Actions` SET ?";
>>>>>>> 26d11db5a0fac4895258f09f2360a16a8fbc8efb
    console.log(query);
    return db.query(query, [set], callback)
}


// Delete an action
exports.delete_action = (Id, callback) => {
    let set = {_id : Id}
<<<<<<< HEAD
    let query = "DELETE FROM `actions` WHERE `_id` = ?";
=======
    let query = "DELETE FROM `Actions` WHERE `_id` = ?";
>>>>>>> 26d11db5a0fac4895258f09f2360a16a8fbc8efb
    console.log(query);
    return db.query(query, Id, callback)
}