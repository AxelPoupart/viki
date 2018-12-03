const mysql = require('mysql');
const sqlConfig = require("../config/sql");

const db = module.exports = mysql.createConnection({
    host: sqlConfig.host,
    user: sqlConfig.user,
    password: sqlConfig.password,
    database: sqlConfig.database
  })
  
db.connect((err) => {
  //if (err) throw err;
  console.log('Connection to db established!');
}); 