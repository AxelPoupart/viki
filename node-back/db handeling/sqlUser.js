const db = require("./start_cnx");

exports.getUsers = callback => {
  let query = "SELECT * FROM `users`";
  db.query(query, callback);
};

exports.add_new_user = (user, callback) => {
  console.log(user)
  let set = {
    mail: user.mail,
    hash: user.hash
  };
  let query = "INSERT INTO `users` SET ?";

  return db.query(query, [set], callback);
};

exports.get_User_Id=(mail,callback) => {
  let query = ` SELECT \`_id\` FROM \`users\`  WHERE \`mail\` = ? `;

  return db.query(query,mail, callback);
};

exports.get_user_privileges = (user_id, callback) => {
  let query =
    "SELECT `label` FROM `privileges`  JOIN `usersPrivileges`   ON `_id` = `privilegesId` WHERE `userId` = ? ";
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

// Get privilegeId by label
exports.get_By_Label = (label, callback) => {
  let query = "SELECT `_id` FROM `privileges`  WHERE `label` = ?";
  console.log(query);
  return db.query(query, [label], callback);
};

// Get all privileges
exports.get_Privileges = ( callback) => {
  let query = "SELECT `label` FROM  `privileges` " ;
  
  return db.query(query, callback);
}


// Select all ingesys
exports.get_By_PrivilegeID = (privilegeId, callback) => {
  let query = `SELECT * FROM \`users\`  JOIN \`usersPrivileges\` ON \`_id\` = \`userId\`  WHERE \`privilegesId\` = ?`;
  console.log(query);
  return db.query(query, [privilegeId], callback);
};

exports.create_user_privileges = (user_id,privileges_id, callback) => {
  
  let query = `INSERT INTO \`usersPrivileges\` SET ?`;
  
  return db.query(query, [{userId:user_id,privilegesId:privileges_id}], callback)
}


exports.set_user_privileges = (user_id,privileges_id, callback) => {
  
  let query = ` UPDATE \`usersPrivileges\` SET \`privilegesId\` = ${privileges_id}  WHERE \`userID\` = ?`;
  
  return db.query(query, user_id, callback)
}

