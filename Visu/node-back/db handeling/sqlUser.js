const db = require('./start_cnx');




// Select all users
exports.getUsers = (callback) => {
    let query = 'SELECT * FROM `users`';
    console.log(query);
    return db.query(query, callback)
}

// Post a new user
exports.postUser = (user, callback) => {
    let query = "INSERT INTO `users` SET ?";
    console.log(query);
    return db.query(query, [user], callback)
}


// Delete an action
exports.deleteUser = (Id, callback) => {
    let query = "DELETE FROM `users` WHERE `_id` = ?";
    console.log(query);
    return db.query(query, [Id], callback)
}

// Select all ingesys
exports.getByStatus = (status, callback) => {
    let query = 'SELECT * FROM `users` WHERE `status` = ?';
    console.log(query);
    return db.query(query, [status], callback)
}

// Change user status
exports.changeStatus = (infos, callback) => {
    let id = infos.id;
    let status = infos.status;
    let query = "UPDATE `users` SET `status` = ? WHERE `_id` = ?";
    console.log(query);
    return db.query(query, [status, id], callback)
}