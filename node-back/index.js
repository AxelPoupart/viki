const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const sqlConfig = require("./config/sql");
const authenticate = require("./auth/authenticate.js");
const port = 5000;
const basicAuth = require('./auth/authmiddleware');
// Define the main app
const app = express();

// Using middlewares
app.use(cors());
app.use(basicAuth);

// Connectiong to the DB; If no db exists, create one
/* const db = mysql.createConnection({
    host: sqlConfig.host,
    user: sqlConfig.user,
    password: sqlConfig.password,
    database: sqlConfig.database
})

db.connect((err) => {
    if (err) throw err;
    console.log('Connection with db established!')
}) */

// Listenning...

app.post('/auth/authenticate',authenticate);

app.get("/", (req, res) => {
    
    res.send("hi");
    
  });

app.listen(port, () => {
  console.log(`Listenning on port ${port}...`);
});
