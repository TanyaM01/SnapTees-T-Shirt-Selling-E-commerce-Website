//const User = require("../models/user")   //user SChema

const express = require ("express")
const router = express.Router()

const {getUserById, getUser,updateUser, getAllUsers, userPurchaseList} = require("../controllers/user")
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")


router.param("userId", getUserById)
//        call anything, method that's gonna populate my req.profile

router.get("/user/:userId",isSignedIn, isAuthenticated, getUser)
// all routes assoc w user to start with /user
//userId -> name it anything 
// if user wants to get all his info like name email etc he has to be signedin n authenticated

router.get("/users", getAllUsers) ////to see entire db of users

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList); //listing all orders here
module.exports = router; 