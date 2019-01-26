const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const content = require("./routes/content");
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
try {
  mongoose.connect('mongodb://localhost/chat-back', { useNewUrlParser: true });
  mongoose.set('debug', true);
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('MongoDB database connection established successfully!')
  });
} catch (error) {
  console.log(error)
}

// Defining routes
app.use("/auth", auth);
 
app.use("/content", (req, res, next) => {
  if (!req.session.auth) {
    return res.status(401).send({ message: "Not authenticated" });
    
  }
  else if (!(req.method=="GET")){
    
     if (!(req.session.privilege[0].label=="sysadmin"|| req.session.privilege[0].label=="ingesys")){

    return res.status(401).send({ message: "Not allowed" });
  }} else
  {console.log("Authentified")}
  next();
}, content);

const userServer = require('./Server/userServer')

app.use("/content-dev/userservice", (req, res, next) => {
  console.log('WORKS')
  next()
}, userServer)

// Listening...
app.listen(port, () => {
  console.log(`Listenning on port ${port}...`);
});


