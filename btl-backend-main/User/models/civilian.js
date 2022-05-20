const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const civilianSchema = new Schema({
    citizenId:{
        type:String,
        require:true,
        unique: true,
    },
    fullname:{
        type:String,
        required:true
    },
    birthday:{
        type: Date,
        required:true,
    },
    gender:{
        type:String,
        required:false,
    },
    origin:{
        type:String,
        required:true
    },
    permanentAddress:{
        type:String,
        required:true
    },
    temporaryAddress:{
        type:String,
        required:true
    },
    religion:{
        type:String,
        requird:false,
    },
    educationLevel:{
        type:String,
        required:true
    },
    career:{
        type:String,
        required:true
    },
    reporter:{
        type: String,
        required:true
    }

    
},{timestamps:true})

module.exports = mongoose.model("Civilian", civilianSchema);
