const db = require('./start_cnx');

exports.get_all_users = (callback) => {
  let query = 'SELECT * FROM `Users`'
  db.query(query, callback)
}


exports.add_new_user = (user, callback) => {
  let set = {
    id: user.id,
	  Email: user.email,
	  Password: user.password,
  }
  let query = "INSERT INTO `Users` SET ?";
  
  return db.query(query, [set], callback)
}


exports.set_user_privileges = (user_id,privileges_id, callback) => {
  
  let query = " UPDATE `UsersPrivileges` SET `PrivilegesID` = privileges_id  WHERE `UserID` = ?";
  
  return db.query(query, user_id, callback)
}

exports.get_user_privileges = (user_id, callback) => {
  let query = 'SELECT label FROM `Privileges`  JOIN `UsersPrivileges`  ON `Privileges._id` = `UsersPrivileges.PrivilegesID` WHERE `UserID` = ? ';
  db.query(query, user_id, callback)
}
