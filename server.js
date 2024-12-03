const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const session = require('express-session')
const passUsertoView = require("./middleware/pass-user-to-view")
const isSignedIn = require("./middleware/is-signed-in")
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

//Port Configuration
const PORT = process.env.PORT ? process.env.PORT : "3000";

//Data Connection
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", ()=>{
  console.log(`connected to MongoDB Database ${mongoose.connection.name}`)
})

//Middlewares
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"))
app.use(morgan('dev'))
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: true
}))
//writing our custom middleware
app.use(passUsertoView)


// Require Controllers
const authCtrl = require('./controllers/auth');

//use controller 
app.use('/auth',authCtrl)//redirect all the rout that start with "/auth" to controller/auth

//Root Rout

app.get('/', async(req,res)=>{
  res.render('index.ejs')
})


// Rout for testing
// VIP-lounge
app.get("/vip-lounge",isSignedIn, (req,res)=>{
  res.send(`Welcome to the party ${req.session.user.username}`)
})







//Listen for HTTP Requests
app.listen(PORT, ()=>{
  console.log(`The App is Listening for requests on port ${PORT}`)
})