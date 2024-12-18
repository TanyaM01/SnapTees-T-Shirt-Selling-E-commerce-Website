const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema; //destructure..come from mongoose.schema ..pull out objectid

//NOte: here we will associate one schema with another schema

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: true,
        maxlength: 32 
    },
    description : {
        type:String,
        trim:true,
        required: true,
        maxlength: 2000
    },
    price: {
        type:Number,
        required: true,
        maxlength: 32 ,
        trim:true
    },
    category: {
        //link with previous category schema
        type: ObjectId,
        ref: "Category", //from where are you pulling objectid
        required:true
    },
    stock : {
        type:Number
    },
    sold: {
        type: Number,
        default:0
    },
    photo: {
        data: Buffer, //photo is stored in data which is gonna be buffer
        contentType : String
    }
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema);