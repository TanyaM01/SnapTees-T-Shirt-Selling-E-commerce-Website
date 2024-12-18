const Product = require("../models/product")
const formidable = require("formidable") //Formidable is a Node.js module used for parsing form data, especially for handling file uploads in web applications.
const _ = require("lodash")
const fs = require("fs") //no need to install, comes as default in nodejs

exports.getProductById = (req,res,next,id) => {

    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product;
        next();
    })

}

//how to upload tshirt in our db

//This code essentially creates a function that handles the creation of a product, including form data and file upload. It uses the formidable library to parse the incoming request, extracts form fields and files, checks for errors, creates a product object, handles file upload (with size restrictions), and finally saves the product to a database.
exports.createProduct = (req, res) => {
    // creation of form..expects 3 parameters
    let form = new formidable.IncomingForm() //now we have object 'form'
    form.keepExtension = true;


    /*
    The form.parse method from the formidable library parses the incoming request (req) and provides information about the form fields and files through its callback function parameters.
    So, in the context of this code:

    fields: Contains the form fields as key-value pairs.
    file: Contains information about the uploaded files, including details like file size, file path, and file type.
    */
    form.parse(req, (err, fields, file) => { //using the parse method of the form object to process the incoming request (req) and extract form data.
        if(err){
            return res.status(400).json({
                error : "problem with image"
            })
        }

        //destructure the fields
        const {name, description, price, category, stock,} = fields;   //price = fields.price
        //sold not gonna come up frm user itslef cz ,we will be putting sold as a middleware,, everytime a stock will be less means sold will be higher in number
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }
        // Create a new Product object using the form fields obtained from parsing the request.
        //todo : restrictions on fields
        let product = new Product(fields);

        //handle file here      call it anything
        //Check if a file named "photo" exists in the parsed form data.
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json9({
                    error: "File size too big!"
                })
            }
            // If the file is within the size limit, read the file synchronously, and store the data and content type in the product object.
            product.photo.data = fs.readFileSync(file.photo.path)   //.path .type are properies
            product.photo.contentType = file.photo.type  
        }
        //console.log(product);

        //now include the file in my product
        //save to db
        // Save the product object to the database.
        product.save((err, product)=>{
            if(err){ 
                return res.status(400).json({
                    error: " Saving tshirt in db failed"
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req,res) => {
    req.product.photo = undefined   //It effectively removes the photo data from the product before sending it as a response.
    return res.json(req.product);   //this sends a JSON response containing the product details. The photo property, which was set to undefined in the previous line, will not be included in the JSON respons
}

//middleware
exports.photo = (req,res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)//This method is used to set a response header. In this case, it's setting the "Content-Type" header to the value of req.product.photo.contentType. The "Content-Type" header specifies the type of data that is being sent in the response body.
        return res.send(req.product.photo.data)
    }
    next();
    // this line ensures that the "Content-Type" header of the response is set to the appropriate content type for the photo data. This information is crucial for the client to interpret the response correctly, especially when dealing with binary data like images. The client uses the "Content-Type" header to understand how to process and display the received data.
}

exports.deleteProduct = (req,res) =>{

    let product = req.product;
    product.remove((err, deletedProduct) => {  //product is an obj frm mongoose so use .remove
        if(err){
            return res.status(400).json({
                error: "Failed to delete product"
            })
        }
        res.json({
            message : "Deletion was successful", deletedProduct
        });
    });
};

exports.updateProduct = (req,res) =>{
//paste from create  just like we have all the fields in the ui to save a product similarly we have an exact same ui for the updation of a product
let form = new formidable.IncomingForm() //now we have object 'form'
form.keepExtension = true;
form.parse(req, (err, fields, file) => { 
    if(err){
        return res.status(400).json({
            error : "problem with image"
        })
    }

    //updation code
    //we want existing product here not new
    let product = req.product;  //getproductbyid
            //  _.extend:it takes the existing vals in the objs that u r having and justs extends that val means all the updation vals get involved there
    product = _.extend(product, fields) //.extend requires 2 things..fields are going to be updated inside this product

    //handle file here      call it anything
    if(file.photo){
        if(file.photo.size > 3000000){
            return res.status(400).json9({
                error: "File size too big!"
            })
        }
        // If the file is within the size limit, read the file synchronously, and store the data and content type in the product object.
        product.photo.data = fs.readFileSync(file.photo.path)   //.path .type are properies
        product.photo.contentType = file.photo.type  
    }
   
    //save to db
    product.save((err, product)=>{
        if(err){ 
            return res.status(400).json({
                error: " Updation of product failed"
            })
        }
        res.json(product)
    })
})

}

//product listing
exports.getAllProducts = (req,res) => {
               //user's input :if there's a query from frontend & if it has a property of limit then use this req.query.limit otherwise use 8 (by default)
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
   
    Product.find()
    .select("-photo")  //what things you don't wanna select
    .populate("category")
    .sort([[sortBy, "asc"]])   //.sort([['updatedAt', 'descending']])
    .limit(limit)
    .exec((err, products) => {
        if(err){
        return res.status(400).json({
            error: "No product found"
             })
        }
        res.json(products)
    })
}

exports.getAllUniqueCategories = (req, res) => {  //It retrieves all unique values in the "category" field from the "Product" 
    Product.distinct("category", {}, (err, category) => {  //distinct method to find all unique values in the "category" field of the "Product"
        if(err){
            return res.status(400).json({
                error: "No category found"
            })
        }
        res.json(category);
    })
}



//model.bulkwrite   stock sold
exports.updateStock = (req,res,next) =>{

    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id}, //to find the product
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                 error: "BULK operation failed"
            })
        } 
          next() 
    })
}














