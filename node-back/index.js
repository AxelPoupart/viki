const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const sqlConfig = require('./config/sql');

const port = 3000;

// Define the main app
const app = express()

// Using middlewares
app.use(cors());

// Connectiong to the DB; If no db exists, create one
const db = mysql.createConnection({
    host: sqlConfig.host,
    user: sqlConfig.user,
    password: sqlConfig.password,
    database: sqlConfig.database
})

db.connect((err) => {
    if (err) throw err;
    console.log('Connection with db established!')
})

// Listenning...
app.listen(port, () => {
    console.log(`Listenning on port ${port}...`);
})
