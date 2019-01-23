const express = require("express");

const handelers = require("../db handeling/sql_handelers");

const sqlUser = require("../db handeling/sqlUser");
const bcrypt = require("bcryptjs");
const app = express();
const router = express.Router();

// Get all users : DONE
router.route("/users").get(  (req, res) => {
  sqlUser.getUsers(async (err, users) => {
    if (err) console.log(err);
    else {
      userlist=JSON.parse(users)
      for (i in users){
        let id=users[i]._id;
        let users[i].privileges =""
        
        users[i].privileges = await sqlUser.get_user_privileges(id,(err,result)=> {
          if (err) console.log(err);
          else {
            console.log(result)
            if (!result===[]){
              return result[0].label
            }
            return ""
          
          
          }
        })}
        
        res.json(users)
      }
      
      
    
  });
});

//Get user By Id
router.route("/users/:id").get((req, res) => {
  let id = req.params.id;
  sqlUser.getUserById(id, (err, user) => {
    if (err) console.log(err);
    else res.json(user);
  });
});

//Get by privilege
router.route("/users/Privilege/:privilege").get((req, res) => {
  privilege = req.params.privilege;
  sqlUser.get_By_Label(privilege, (err, priv) => {
    if (err) console.log(err);
    else console.log(priv._id);
    sqlUser.get_By_PrivilegeID(priv._id, (err, users) => {
      if (err) console.log(err);
      else res.json(users);
    });
  });
});

//Change user privilege
router.route("/users/changePrivilege").post((req, res) => {
  let infos = req.body;
  sqlUser.set_user_privileges(infos, (err, user) => {
    if (err) console.log(err);
    else res.json(user);
  });
});



// get privileges
router.route("/users/privileges").get((req, res) => {
  sqlUser.get_Privileges((err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

module.exports = router;
