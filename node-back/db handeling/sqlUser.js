const db = require("./start_cnx");

exports.getUsers = callback => {
  let query = "SELECT * FROM `users`";
  db.query(query, callback);
};

exports.add_new_user = (user, callback) => {
  let set = {
    id: user.id,
    Email: user.email,
    
  };
  let query = "INSERT INTO `users` SET ?";

  return db.query(query, [set], callback);
};
// A revoir
// exports.set_user_privileges = (user_id, privileges_id, callback) => {
//   let query =
//     " UPDATE `usersPrivileges` SET `PrivilegesID` = privileges_id  WHERE `UserID` = ?";

//   return db.query(query, user_id, callback);
// };

exports.get_user_privileges = (user_id, callback) => {
  let query =
    "SELECT * FROM `privileges`  JOIN `usersPrivileges` up  ON `privileges._id` = `up.PrivilegesID` WHERE `up.UserID` = ? ";
  db.query(query, user_id, callback);
};


// Delete an user
exports.deleteUser = (Id, callback) => {
  let query = "DELETE FROM `users` WHERE `_id` = ?";
  console.log(query);
  return db.query(query, [Id], callback);
};

// Select all ingesys
exports.getByStatus = (status, callback) => {
  let query = "SELECT * FROM `users` WHERE `status` = ?";
  console.log(query);
  return db.query(query, [status], callback);
};

exports.set_user_privileges = (user_id,privileges_id, callback) => {
  
  let query = " UPDATE `usersPrivileges` SET `PrivilegesID` = privileges_id  WHERE `UserID` = ?";
  
  return db.query(query, user_id, callback)
}

exports.get_user_privileges = (user_id, callback) => {
  let query = 'SELECT label FROM `Privileges`  JOIN `usersPrivileges`  ON `Privileges._id` = `usersPrivileges.PrivilegesID` WHERE `UserID` = ? ';
  db.query(query, user_id, callback)
}
