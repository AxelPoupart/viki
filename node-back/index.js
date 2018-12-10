const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const content = require("./routes/content");
const content_dev = require("./routes/content-dev");
// Define the main app
const app = express();
const port = 5000;


app.get('/my-demo-route', (req, res) => res.send('hello world'))

// Using middlewares

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser());

app.use(
  session({
    name: "wiki-dty",
    secret: toString(Date.now()),
    saveUninitialized: true,
    resave: true
  })
);

// Connectiong to the DB...
try {
  require('./db handeling/start_cnx')
} catch (error) {
  console.log(error);
}


//Connect to mongoDB server (Chat)
mongoose.connect('mongodb://localhost/chat-back');
mongoose.set('debug', true);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!')
});



// Defining routes
app.use("/auth", auth);
app.use("/content-dev", content_dev);

app.use("/content", (req, res, next) => {
  if (!req.session.auth) {    
    return res.status(400).send({ message: "Not authenticated" });
  }
  console.log("Authentified")
  next();
});


// Listening...
app.listen(port, () => {
  console.log(`Listenning on port ${port}...`);
});


