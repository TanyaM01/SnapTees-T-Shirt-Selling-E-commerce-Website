var express = require('express')
var router = express.Router()
const { check , validationResult }= require('express-validator')
const {signout, signup, signin, isSignedIn} = require("../controllers/auth")//want to import signout method from auth controller

//express router
//HTTP methods include GET, POST, PUT, DELETE,  what kind of request you want to get?
//GET is used to request data from a server, 
//typically to retrieve information or resources from a specific URL
/* 
EARLIER...now check in controller->auth.js
router.get("/signout", (req,res) => {   //get method of the router.
    res.send ("user signout")
})
*/
//route, validation, controller
router.post("/signup",[
    check("name", "name should be at least 3 character").isLength({ min : 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min : 3 })
], signup) //paasing to the db then use post 

router.post("/signin",[
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min : 1 })
], signin) 


router.get("/signout", signout); //get method of the router. grab something frm db


router.get("/testroute",isSignedIn, (req, res) => { //call back
    res.send("A protected route")
})
module.exports = router;

//if i want to see the working go  into the controller, if i want to mess around w the routes come here ..