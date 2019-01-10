const mysql = require('mysql');
const sqlConfig = require("../config/sql");

const db = module.exports = mysql.createConnection({
    host: sqlConfig.host,
    user: sqlConfig.user,
    password: sqlConfig.password,
    database: sqlConfig.database
  })
  
db.connect((err) => {
  if (err) console.log('SQL database connexion failed !');
  else console.log('Connection to db established!');
});