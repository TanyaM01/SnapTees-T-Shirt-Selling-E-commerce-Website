//schema for users
const mongoose = require("mongoose")//lib imports the Mongoose library, which is used for MongoDB object modeling in Node.js
const crypto = require('crypto');//imports the built-in Node.js crypto module, which provides cryptographic functionality like hashing.
const uuidv1 = require('uuid/v1');//imports the uuidv1 library, which is used for generating UUIDs (Universally Unique Identifiers)

var Schema = mongoose.Schema;

var userSchema = new Schema({  // creates Mongoose schema called userSchema

    name: {
        type: String,
        required: true, //Database always expect name to come 
        maxlength: 32,
        trim: true //trims down all the extra spaces that might come
    },
    lastname: {
        type: String, 
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true, 
        required: true,
        unique: true //if there's duplication of email, i'll get informed by the mongodb
    },
    userinfo: {
        type: String,
        trim: true
    },
    //TODO: come back here
    encry_password: {
        type: String,
        required: true
        
    },
    //a salt is random data fed as an additional input to a one-way function that hashes data, a password or passphrase.
    salt: String,//defines a field called salt in the schema.

    role: {
        type: Number,
        default: 0 //everybody gonna be 0
    },
    purchases: {
        type: Array,
        default: [] //nobody buys anything as of now, empty array in start
    }
}, {timestamps: true});

//collect info from user(pass)  and create a virtual field which can on the fly encrypt the pass and store it in my db
//virtual fields
userSchema.virtual("password") //storing encry_pass in db ..virtual property named "password" on the userSchema. Virtual properties are not stored in the database but can be used to define custom behavior.By using a virtual property, you can avoid storing plain text passwords directly in the db. Instead, you store a hashed version of the password along with a salt value 
    .set(function(password){ //somebody gives us password   a setter function for the "password" virtual property. 
        this._password = password //JS creates a new property _password on the this object (which refers to the schema instance) and assigns the value of the password parameter to it. //this._password is specific to the user instance and is not saved to the db
        this.salt = uuidv1();//generates a unique "salt" using uuidv1()..In cryptography, a "salt" is a random value that is added to the data before it is hashed..primary purpose salt is to make the resulting hash unique, even if two users have the same password.
        //Generating a new salt for each user ensures that the salt value is unpredictable
        this.encry_password = this.securePassword(password);//to securely hash the password and store it in the encry_password field.
    })
    .get(function(){ //defines a getter function for the "password" virtual property.
       return this._password 
    });


userSchema.methods = {

    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    }, //true ya false it will return if it matches

    securePassword: function (plainpassword){  //used to securely hash a plain password. takes a plainpassword as an argument and uses the provided salt to create a secure hash using the crypto module.
        if(!plainpassword) return ""; //if no password provided by user
        try{
            return crypto
            .createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }
        catch(err){
            return "";
        }
    }
}



module.exports = mongoose.model("User", userSchema)

/*
import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
*/