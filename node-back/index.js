const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlConfig = require("./config/sql");
const authenticate = require("./auth/authenticate.js");
const port = 5000;
const basicAuth = require('./auth/authmiddleware');
// Define the main app
const app = express();
const users = require("./auth/users.json");
// Using middlewares
app.use(cors());
app.use(bodyParser());
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

app.post('/auth/authenticate',(req, res)=> {
  
  try{  
  
  username=req.body.username;
  password=req.body.password;
  
  const user = users.find(
    u => u.name == username && u.password == password
  );
  console.log(user);
  if (user) {
    
   res.json(user) }else{ res.status(400).send({ message: 'Username or password is incorrect' })
  } }
  catch(error){console.log(error)} ;
  });

app.get("/", (req, res) => {
    
    res.send("hi");
    
  });

app.listen(port, () => {
  console.log(`Listenning on port ${port}...`);
});
