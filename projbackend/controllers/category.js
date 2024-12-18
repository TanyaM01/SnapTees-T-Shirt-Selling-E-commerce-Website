const Category = require("../models/category")

exports.getCategoryById = (req, res,next,id) => {

    Category.findById(id).exec((err, cate) => { //a callback function with two parameters: err for any potential errors and cate for the retrieved category.
        if(err){
            return res.status(400).json({
                error: "category not found in DB"  //json passes obj
            })
        }
        //if category found in the format of cate then populate req obj which is category
        req.category = cate;
        next();
    });
};


exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err) {
            return res.status(400).json({
                error: "NOT able to save category in Db"  //json passes obj
            });
        }
        res.json({category});//is used to send a JSON response to the client. This time, it contains the saved category object. This indicates that the category was successfully saved to db
    });
};
/*
exports.createCategory is exporting a function that can be used in other parts of your Node.js application.
(req, res) are the parameters of the function. req represents the request object, and res represents the response object. These are commonly used in Express.js applications for handling HTTP requests and responses.
const category = new Category(req.body); creates a new instance of a "Category" model (assuming you have a model named "Category") using the data from the request body (req.body). This is a common practice when working with databases to create a new record.
category.save() is a method that attempts to save the newly created category to the database. It takes a callback function as an argument, which will be called once the save operation is complete.This callback function has two parameters: err and category. If an error occurs during the save, it will be passed as the err parameter, and the saved category object will be passed as the category parameter.
Inside the callback function, there is an error check: if (err) { ... }. If there is an error (the err object is not null), it sends a response with a 400 status code and a JSON object containing an "error" message indicating that the category could not be saved.
If there is no error, it sends a response with a 200 status code and a JSON object containing the saved category.

Here's a breakdown of the response structure:

If there is an error: HTTP status code 400 and a JSON response with an "error" message.
If the category is successfully saved: HTTP status code 200 and a JSON response with the saved category.
This code assumes that you have set up a database connection, defined a "Category" model, and properly configured your Express.js route to handle incoming POST requests to create categories. Additionally, it's important to ensure that you handle errors and validation of the request body data appropriately to prevent potential issues.



In this line of code:
Category appears to be a model or constructor function that represents a category in your application. This is typically used when you're working with an object-relational mapping (ORM) or a database framework, such as Mongoose for MongoDB or Sequelize for SQL databases. The Category model would define the structure and behavior of a category object, including its fields and how it interacts with the database.
new Category() is used to create a new instance of the Category model. In other words, you're creating a new category object based on the definition provided by the Category model.
req.body is an object that contains the data sent in the HTTP request's body. When a client (e.g., a web browser or a mobile app) makes an HTTP POST request to your server to create a new category, they typically send data in the request body. req.body is used to access this data. The data in req.body should correspond to the fields defined in the Category model.
So, when you execute const category = new Category(req.body);, you're essentially creating a new category object, populating it with the data from the HTTP request's body (req.body), and preparing it for saving to a database. This is a common practice in web applications when you want to create a new database record based on user input.
*/

exports.getCategory = (req,res) => {
    //if you want just one category
    return res.json(req.category);
};

exports.getAllCategory = (req,res) => {
    //to get all the categories
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: "NO categories found"
            });
        }
        res.json(categories);
    });
};

exports.updateCategory = (req,res) => {
    const category = req.category;//grabbing from req that we are sending
    category.name = req.body.name;
    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update category"
            });
        }
        res.json(updatedCategory);
    })
}


exports.removeCategory = (req,res) => {
    const category = req.category;

    category.remove((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete this category"
            });
        }
        res.json({
            message : "Successfully deleted"
        })
    })
}














