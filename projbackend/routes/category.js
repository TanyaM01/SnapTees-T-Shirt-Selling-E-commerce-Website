const express = require("express")
const router = express.Router()

const {getCategoryById, createCategory, getCategory,getAllCategory, updateCategory, removeCategory} = require("../controllers/category")
const {isSignedIn, isAdmin, isAuthenticated} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//params
router.param("userId", getUserById) //anytime it's gonna see userid in the parametr it will populate profile field
router.param("categoryId", getCategoryById)

//actual routes goes here
//create routes
router.post("/category/create/:userId",isSignedIn, isAuthenticated, isAdmin, createCategory)

//read routes 
//to grab one single category we say :categoryId
router.get("/category/:categoryId", getCategory)
router.get("/categories/", getAllCategory)

//remove route
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin, removeCategory)

//update
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin, updateCategory)


module.exports = router;


