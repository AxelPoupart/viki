const db = require("./start_cnx");

exports.getUsers = callback => {
  let query = "SELECT * FROM `Users`";
  db.query(query, callback);
};

exports.add_new_user = (user, callback) => {
  let set = {
    
    mail: user.email,
    hash: user.hash
    
  };
  let query = "INSERT INTO `Users` SET ?";
  console.log(set);

  return db.query(query, [set], callback);
};
// A revoir
// exports.set_user_privileges = (user_id, privileges_id, callback) => {
//   let query =
//     " UPDATE `UsersPrivileges` SET `PrivilegesID` = privileges_id  WHERE `UserID` = ?";

//   return db.query(query, user_id, callback);
// };

exports.get_user_privileges = (user_id, callback) => {
  let query =
    "SELECT * FROM `privileges`  JOIN `UsersPrivileges` up  ON `privileges._id` = `up.PrivilegesID` WHERE `up.UserID` = ? ";
  db.query(query, user_id, callback);
};


// Delete an user
exports.deleteUser = (Id, callback) => {
  let query = "DELETE FROM `users` WHERE `_id` = ?";
  console.log(query);
  return db.query(query, [Id], callback);
};

// New user account
exports.new_user = (user, callback) => {
  let set = user
  let query = "INSERT INTO `users` SET ?";
  console.log(query);
  return db.query(query, [set], callback)
}

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
  let query = 'SELECT label FROM `privileges`  JOIN `usersPrivileges`  ON `privileges._id` = `usersPrivileges.PrivilegesID` WHERE `UserID` = ? ';
  db.query(query, user_id, callback)
}
