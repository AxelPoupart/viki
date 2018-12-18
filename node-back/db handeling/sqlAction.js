const db = require('./start_cnx');

<<<<<<< HEAD



=======
>>>>>>> b58289d235ced8f4ef4ddd2fdd8b26d01d6df11c
// Select all actions
exports.get_all_actions = (callback) => {
    let query = 'SELECT * FROM `actions`';
    console.log(query);
    return db.query(query, callback)
}

// Post a new action
exports.post_new_action = (action, callback) => {
    let set = action
    let query = "INSERT INTO `actions` SET ?";
    console.log(query);
    return db.query(query, [set], callback)
}


// Delete an action
exports.delete_action = (Id, callback) => {
    let set = {_id : Id}
    let query = "DELETE FROM `actions` WHERE `_id` = ?";
    console.log(query);
    return db.query(query, Id, callback)
}