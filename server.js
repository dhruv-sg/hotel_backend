const express = require("express")
const app = express()
const Path = require("path");
const PORT  = 3001
const db = require('./db')
const passport = require('./auth')
// const Person = require('./models/person')
// const Item = require('./models/items')


// body parser to handle incoming data
const bodyParser =require("body-parser");
const { error, log } = require("console");
app.use(bodyParser.json())

//log request middleware
const logRequest = (req,res,next)=>{
    // console.log(`[${new Date().toLocaleString()} request made to : ${req.originalUrl}]`); // this will console url with password.
     console.log(`[${new Date().toLocaleString()}] request made to: ${req.path}`);
  
    next();
}
app.use(logRequest)

//passport for authantication
app.use(passport.initialize())
const localauth = passport.authenticate('local',{session:false})


app.get("/",localauth,(req,res)=>{
    res.send("<center><h1><i>welcome to my hotel<h1>")
    })


const personRoutes = require('./routes/person')
app.use('/person',personRoutes)

const itemRoutes = require('./routes/item')
app.use('/menu',itemRoutes)

app.listen(PORT ,(res)=>{
    console.log("server started at : ",PORT);
    })


