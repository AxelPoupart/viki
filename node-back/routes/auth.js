const express = require("express");
const router = express.Router();
const user_db = require("../db handeling/sqlUser");
const bcrypt =require('bcryptjs');
router.post("/authenticate", (req, res) => {
  console.log("AUTH middleware!");
  mail = req.body.mail;
  password = req.body.password;
  

  user_db.getUsers((err, results) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "Authentication error of some kind" });
    }

    let users = results.map(user =>
      JSON.parse(
        JSON.stringify({
          mail: user["mail"],
          hash: user["hash"],
          id: user["_id"]
        })
      )
    );

    const user = users.find(u => u.mail == mail && bcrypt.compareSync(password,u.hash) );
    if (user) {
      req.session.user_id = user.id;
      req.session.auth = true;
      req.session.usermail = user.mail;
      user_db.get_user_privileges(user.id, (err, results) => {
        if (err) console.log(err);
        req.session.privilege =results;
        res.json(user);
        console.log(req.session.privilege + req.session.id);
      });
    } 
    else {
      res.status(400).send({ message: "mail or password is incorrect" });
    }
  });
});

router.get("/authenticate", (req, res) => {
  console.log("AUTH GET; req.session keys: " + Object.keys(req.session));
  if (req.session.auth) {
    user = {
      auth: req.session.auth,
      privileges: req.session.privilege,
      mail: req.session.usermail
    };
    console.log(user);
    res.json(user);
  } else {
    res.status(400).send({ message: "Not Logged in" });
  }
});

module.exports = router;
