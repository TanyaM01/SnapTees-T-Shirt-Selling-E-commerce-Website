//anything that you wantto happen at the very first launch of application..goes in app.js

//how to connect mongoose with database  fire terminal with mongosh
require('dotenv').config()


const mongoose = require('mongoose');
const express = require("express") //we req express for listening ..
const app = express();//app uses express

//middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//MY ROUTES
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")


/*
Here, you apply the middleware you imported earlier to your Express application. 
This means that any incoming requests will pass through these middleware functions,
 allowing your application to handle request bodies, cookies, and CORS (Cross-Origin Resource Sharing) headers appropriately.
*/ 

//DB Connection  //url string that will be able to connect with db
mongoose.connect(process.env.DATABASE, {
     useNewUrlParser: true, //properties that you have to mention
     useUnifiedTopology: true,
     useCreateIndex:true          //helps us to keep db connection alive surely
    }).then(() => {
        console.log("DB CONNECTED")
    })//.catch( console.log("DB GOT OOOPPS"));
//myfun.run().then().catch()


//middlewares most common middlewares by express
//app.use() is typically used to apply middleware functions globally to all routes or a subset of routes, not to specific route handlers.
// When you use app.use(), the middleware function will be executed for every incoming request, regardless of the route.
app.use(bodyParser.json())  //to load the middleware funcn call app.use()
//whatever val the req is taking from frontend, it handles that...it gives req.body property where we can have req.body.name , req.body.email..etc info from frontend
app.use(cookieParser())
//it just handles the header and populate a req.cookie..if we want to take something frm cookie or set something frm cookie..use that as a middleware
app.use(cors()) //cross origin resource sharing-
//allows restricted resources on a web page to be requested from another domain outside the domain


//writing middleware for use in Express apps
//how can i use middleware in my homepage?
//MY ROUTES  i want to explicitally mention that i am designing api
app.use("/api", authRoutes);// to apply the authRoutes middleware to all routes that start with "/api".   //http://localhost:8000/api/signout
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);



//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
    //console.log("App is running..")
    console.log(`App is running at ${port}`);
})