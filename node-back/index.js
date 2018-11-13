const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlConfig = require("./config/sql");
const session=require('express-session');

const auth = require('./routes/auth');
const content = require('./routes/content');
// Define the main app
const app = express();
const port = 5000;

// Using middlewares
app.use(cors());
app.use(bodyParser());
app.use(session({secret:'sessiontest'}));

/* Connectiong to the DB; If no db exists, create one
const db = module.exports = mysql.createConnection({
  host: sqlConfig.host,
  user: sqlConfig.user,
  password: sqlConfig.password,
  database: sqlConfig.database
})

db.connect((err) => {
  if (err) throw err;
  console.log('Connection with db established!')
})
*/
// Defining routes
app.use('/auth', auth);
app.use('/content',content);

// Listening...
app.listen(port, () => {
  console.log(`Listenning on port ${port}...`);

});
