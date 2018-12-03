const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlConfig = require("./config/sql");
const session = require("express-session");


const auth = require("./routes/auth");
const content = require("./routes/content");
// Define the main app
const app = express();
const port = 5000;


app.get('/my-demo-route', (req, res) => res.send('hello world'))

// Using middlewares

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

//app.use(cors(corsOptions));

app.use(bodyParser());

app.use(
  session({
    name: "wiki-dty",
    secret: toString(Date.now()),
    saveUninitialized: true,
    resave: true
  })
);

// Connectiong to the DB...
require('./db handeling/start_cnx')

// Defining routes
app.use("/auth", auth);
app.use("/content", (req, res, next) => {
  if (!(req.session.auth == true)) {
    console.log('e')
    res.status(400).send({ message: "Not authenticatesd" });
  };
  next();

});
app.use("/content", content);

// Listening...
app.listen(port, () => {
  console.log(`Listenning on port ${port}...`);
});




