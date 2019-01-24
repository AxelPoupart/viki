const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const sqlUser = require("../db handeling/sqlUser");

router.post("/authenticate", (req, res) => {
  mail = req.body.mail;
  password = req.body.password;


  sqlUser.getUsers((err, results) => {
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

    const user = users.find(u => u.mail == mail && bcrypt.compareSync(password, u.hash));
    if (user) {
      req.session.user_id = user.id;
      req.session.auth = true;
      req.session.usermail = user.mail;
      sqlUser.get_user_privileges(user.id, (err, results) => {
        if (err) console.log(err);
        else {
          req.session.privilege = JSON.parse(JSON.stringify(results));
          res.json(user);
          console.log(req.session.privilege + req.session.id);
        }
      });
    }
    else {
      res.status(400).send({ message: "mail or password is incorrect" });
    }
  });
});

router.get("/authenticate", (req, res) => {
  if (req.session.auth) {
    user = {
      auth: req.session.auth,
      privileges: req.session.privilege,
      mail: req.session.usermail
    };
    res.json(user);
  } else {
    res.status(400).send({ message: "Not Logged in" });
  }
});



//add user
router.post("/authenticate/newuser", (req, res) => {
  let info = req.body;
  console.log("CREATE NEW USER");
  email = info.email;
  password = info.password;
  hash = bcrypt.hashSync(password, 8);
  user = { mail: email, hash: hash };
  sqlUser.add_new_user(user, err => {
    if (err) {
      console.log(err);
      res.status(400);
    } else {
      sqlUser.get_User_Id(email, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400);
        } else {
          let id = result[0]._id;

          sqlUser.create_user_privileges(id, "3", err => {
            if (err) {
              console.log(err);
              res.status(400);
            } else {
              res.status(200).send({ message: "User created" });
            }
          });
        }
      });
    }
  });
});

router.get('/logout', (req, res)=> {
  req.session.auth = null;
  res.send()
})

module.exports = router;
