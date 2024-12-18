const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema;
const Schema = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    //based on product schema created in past
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price:Number

}) 

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);


const orderSchema = new Schema({
    products: [ProductCartSchema],  //array for products in the cart [ProductCartSchema] (not designed yet)//as products inside the cart has different properties like how many qty of prod you are getting, what is the total of that? 
    //field should be an array where each element of the array follows the schema defined in ProductCartSchema

    transaction_id :{}, //{} represents an empty object literal.
    //transaction_id = {1,23}
    
    amount: {
        type: Number
    },
    
    address: {
        type:String
    },
    status:{
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"]
    //only from enum choices you can use things, airplane eg, (restrictive)
    },
    updated: Date,
    
    user:{
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true} );

const Order = mongoose.model("Order", orderSchema);

module.exports = {Order,ProductCart}