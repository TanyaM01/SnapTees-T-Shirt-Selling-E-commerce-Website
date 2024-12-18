const express = require("express");
const app = express();
/*
simple app that listens on port 8000, sends me hello there when I visit this / route
//we are creating our own server
const port = 3000 // port can be anything

app.get('/', (req, res) => { //call back - is a method that doesn't have any name but acts like a method
  res.send('Hello World!')
})  //get request  ..to get any data ..and we are mentioning I want to use app.get on '/' route

app.listen(port, () => { //call back
  console.log(`Example app listening on port ${port}`)
}) 
//listening on some port so that our server can send some response back
*/

const port = 8000;
app.get("/", (req,res) => {
    return res.send("Home page");
} ) ;


//middlewares
const admin = (req,res) => {  //middleware
    return res.send("this is admin dashboard")
}
const isLoggedin = (req,res,next) => {
    console.log("isLoggedin is running") 
    next()
}
const isAdmin = (req,res,next) => {
    console.log("isAdmin is running") 
    next()
}
app.get("/admin", isLoggedin, isAdmin, admin) //3 things happening..when req is being made, checking out something, sending res back




app.get("/login", (req,res) => {
    return res.send("You are visiting login route");
} ) ;
app.get("/signup", (req,res) => {
    return res.send("You are signed up");
} ) ;
app.get("/signout", (req,res) => {
    return res.send("You are signed out");
} ) ;

app.listen(port, () => {
    console.log("Server is up and running..");
})

//to run: node index.js

//nodemon: