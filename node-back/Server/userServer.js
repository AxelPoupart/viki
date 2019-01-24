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
      
        console.log(users)
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
    sqlUser.get_By_PrivilegeID(priv[0]._id, (err, users) => {
      if (err) console.log(err);
      else res.json(users);
    });
  });
});

//Change user privilege
router.route("/users/changePrivilege").post((req, res) => {
  let userid = req.body.id;
  let privilegeid="";
  if (req.body.privilege=="visiteur"){
    privilegeid="3";
  } else if (req.body.privilege=="ingesys"){
    privilegeid="2";
  } else if (req.body.privilege=="sysadmin"){
    privilegeid="1";
  } else {
    res.status(400).send("privilege not recognised")
  }
  sqlUser.set_user_privileges(userid,privilegeid, (err) => {
    if (err) console.log(err);
    else res.status(201).send("Privileges updated");
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
