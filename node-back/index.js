const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlConfig = require("./config/sql");
const session=require('express-session');
const cookieParser =require("cookie-parser");

const auth = require('./routes/auth');
const content = require('./routes/content');
// Define the main app
const app = express();
const port = 5000;

// Using middlewares
app.use(cors());
app.use(bodyParser());
app.use(cookieParser());
app.use(session({secret:'sessiontest'}));

// Connectiong to the DB...
require('./db handeling/start_cnx')

// Defining routes
app.use('/auth', auth);
app.use('/content',content);

// Listening...
app.listen(port, () => {
  console.log(`Listenning on port ${port}...`);

});
