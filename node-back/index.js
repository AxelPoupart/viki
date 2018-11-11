const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const basicAuth = require('./auth/authmiddleware');
// importing routes
const auth = require('./routes/auth');
const appCreation = require('./routes/AppCreation');

// Define the main app
const app = express();
const port = 5000;

// Using middlewares
app.use(cors());
app.use(bodyParser());
app.use(basicAuth);

// Connectiong to the DB...
require('./db handeling/start_cnx')

// Defining routes
app.use('/auth', auth)
app.use('/AppCreation', appCreation)

// Listening...
app.listen(port, () => {
  console.log(`Listenning on port ${port}...`);

});
