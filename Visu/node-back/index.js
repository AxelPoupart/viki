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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(
  session({
    name: "wiki-dty",
    secret: toString(Date.now()),
    saveUninitialized: true,
    resave: true
  })
);

// Connectiong to the DB...
require('./db handeling/start_cnx')


//Connect to mongoDB server (Chat)
try {
mongoose.connect('mongodb://localhost/chat-back', {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!')
});
} catch (error) {
  console.log('Mongoose database connexion failed !')
}




// Defining routes
app.use("/auth", auth);
app.use("/content-dev", content_dev);

app.use("/content", (req, res, next) => {
  console.log('addressing content in index.js; \n======req Object keys======\n' + Object.keys(req) + '\n=====REQ.SESSION KEYS ====\n' + Object.keys(req.session))
  if (!req.session.auth) {    
    return res.status(400).send({ message: "Not authenticated" });
  }
  else {console.log("Authentified")}
  next();
}, content);


// Listening...
app.listen(port, () => {
  console.log(`Listenning on port ${port}...`);
});