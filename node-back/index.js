const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
<<<<<<< HEAD
const sqlConfig = require("./config/sql");
const session=require('express-session');
=======
const basicAuth = require('./auth/authmiddleware');
// importing routes
const auth = require('./routes/auth');
const appCreation = require('./routes/AppCreation');
>>>>>>> 03554e45406f97ab9419523e6d94557e393f2e8d

const auth = require('./routes/auth');
const content = require('./routes/content');
// Define the main app
const app = express();
const port = 5000;

// Using middlewares
app.use(cors());
app.use(bodyParser());
app.use(session({secret:'sessiontest'}));

// Connectiong to the DB...
require('./db handeling/start_cnx')

// Defining routes
<<<<<<< HEAD
app.use('/auth', auth);
app.use('/content',content);
=======
app.use('/auth', auth)
app.use('/AppCreation', appCreation)
>>>>>>> 03554e45406f97ab9419523e6d94557e393f2e8d

// Listening...
app.listen(port, () => {
  console.log(`Listenning on port ${port}...`);

});
