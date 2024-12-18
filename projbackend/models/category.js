const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    name: {
        
        type: String,
        trim : true,
        required: true,
        maxlength: 32,
        unique: true
    }
},
 {timestamps: true}// whenever i am making a new entry thru this schems it will record the time it was created and store in the database
);

module.exports = mongoose.model("Category", categorySchema);