//all the auth methods are inside auth controller


const User = require("../models/user")
const { check , validationResult }= require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup = (req,res) => {
    //console.log("Signup works!") since it's a post route 
    //see postman 
    /*
    console.log("REQ BODY", req.body) //take advantage of middleware that is already installed(body-parser) //here in console you will see REQ BODY { name: 'Tanya', lastname: 'Maurya', age: 22 }
    res.json({
        message: "signup route works!"
    })
    */
   const errors = validationResult(req) //create errors     
   if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
   }
   /* Instead of just returning the first error message, we collect all error messages into an array called errorMessages by using the map function on errors.array(). 
   Each error object in the errors array has a msg property containing the error message.
   const errorMessages = errors.array().map(error => error.msg);
        return res.status(422).json({
            errors: errorMessages
        });
        */
       //token based method->long str which we put in cookies of the browser and that's how we authenticate user that he is logged in or not logged in
       //how to generate token? 3 npms- jsonwebtoken, express-jwt(whenever we need to authenticate any user whether he is logged in or not)
       //how to put this token in user's browser? cookieparser helps to create/del vals in cookies
   const user = new User(req.body) //creating object from User class
   user.save((err, user) => {//since user is created from class USer which is further created frm class of mongoose, we can access all the database methods that mongoose provides us. user.save,populate 
    if(err){
        return res.status(400).json({
            err : "NOT able to save user in DB"
        })
    }
   // res.json(user)  if you want every field that is in user model then only use this
    res.json({
        name: user.name,
        email: user.email,
        id : user._id
    });
   })
}

exports.signin = (req,res) => {
    const {email, password} = req.body; //destructuring of data..extract email and password from req.body // destructuring to extract the email and password properties from the req.body object.
    const errors = validationResult(req) //validation middleware (possibly from a library like Express Validator) to validate the incoming request (req). 
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
   }
   //now we are sure that email and password are coming from route
   User.findOne({email}, (err, user) => {  //findone: //finds first one match from db
    if(err || !user){  //error or no user found
         return res.status(400).json({
            error: "User email doesn't not exists"
        })
    }
    //email found yahan tak so now check paswword matches or not
    if(!user.authenticate(password)){ //if password doesn't match show error
        return res.status(401).json({
            error: "email and password do not match"
        })
    }
    //now if email & pass is correct & present in db then..
    //create token
    const token = jwt.sign({_id : user._id}, process.env.SECRET)
    //put token in cookie
    res.cookie("token", token, {expire: new Date() + 9999})

    //send response to frontend
    const {_id,name,email,role} = user
    return res.json({ token , user: {_id, name, email, role}})
 
   });

}

//const signout = (req,res) => {   
exports.signout = (req,res) => {
    //res.send ("user signout success")  earlier
    //json response cz server is now instead of sending response message, is sending json mssg and that is how apis are being created, we throw key vals pairs inside objs 
    res.clearCookie("token"); // clear the cookie whose name is token and val is also token
    res.json({
        message : "User signout successfully"
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET, //creating obj 
    userProperty: "auth"   //cookie parser allows to set properties inside users browser
});


//custom middlewares
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    //checker checks whether user is authenticated or not
    //thru frontend we gonna make property inside user which is profile..only going to be set if the user is logged in  email id role ho tb hi yei property set hogi
    // if req.auth is there  and if user owns that accn or not
    if(!checker){
         return res.status(403).json({
            error : "Access Denied"
         })
    }
    next();
}

exports.isAdmin = (req,res,next) => {

    //we have role is user model //if 1 then only admin warna user 
    if(req.profile.role === 0 ){
        res.status(403).json({
            error: "You are not admin, access denied"
        })
    }
    next();
}


