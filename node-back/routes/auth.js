const express = require("express");
const router = express.Router();
const user_db = require("../db handeling/sqlUser");

router.post("/authenticate", (req, res) => {
  console.log("AUTH middleware");
  email = req.body.email;
  password = req.body.password;

  user_db.getUsers((err, results) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "Authentication error of some kind" });
    }

    let users = results.map(user =>
      JSON.parse(
        JSON.stringify({
          email: user["Email"],
          password: user["Password"],
          id: user["_id"]
        })
      )
    );

    const user = users.find(u => u.email == email && u.password == password);
    if (user) {
      req.session.user_id = user.id;
      req.session.auth = true;
      req.session.useremail = user.email;
      user_db.get_user_privileges(user.id, (err, results) => {
        if (err) console.log(err);
        req.session.privilege =results;
        res.json(user);
        console.log(req.session.privilege + req.session.id);
      });
    } 
    else {
      res.status(400).send({ message: "email or password is incorrect" });
    }
  });
});

router.get("/authenticate", (req, res) => {
  console.log("AUTH GET; req.session keys: " + Object.keys(req.session));
  if (req.session.auth) {
    user = {
      auth: req.session.auth,
      privileges: req.session.privilege,
      email: req.session.useremail
    };
    console.log(user);
    res.json(user);
  } else {
    res.status(400).send({ message: "Not Logged in" });
  }
});

module.exports = router;
