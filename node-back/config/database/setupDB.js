const fs = require('fs');
const mysql = require('mysql');
const configFile = require('../sql');

// Create a new database
let db = mysql.createConnection({
    host: configFile.host,
    user: configFile.user,
    password: configFile.password
})

db.connect((err) => {
    if (err) throw err;
    console.log(`Connected successfully to ${configFile.host}.`);
    db.query(`CREATE DATABASE IF NOT EXISTS \`${configFile.database}\``, (err, res) => {
        if (err) {
            console.log('error while creating new database..');
            throw err;
        }
        if (res['warningCount']) console.log('Database already exists.');
        else console.log('Database created.');
        db.end((err) => {
            if (err) throw err;
            db = mysql.createConnection(configFile);
            db.connect((err) => {
                if (err) throw err;
                console.log(`Connected Sucessfully to ${configFile.database}`);
                setupDatabase()
            })
        })
    })
})

setupDatabase = () => {
    fs.readFile('./setupDB.sql', 'utf8', (err, data) => {
        if (err) throw err;
        data = data.split(';').map(command => command.replace('\n', ''));
        let query = data[0];
        for (let query of data) {
            if (query) db.query(query, (err, res) => {
                if (err) {
                    console.log(`WARNING: Couldnt proceed with query: ${query}\n`);
                } else console.log(`SUCCESS: ${query}\n`);
                
            })
        }
        db.end((err)=>{
            if (err) throw err;
            console.log('Tables created successfully.')
        })
    
    })
}