const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const Schema =  mongoose.Schema;

const adminSchema = new Schema({
    fullname: {
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
    },
    superior:{
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required:true
    },
    gender:{
        type:String,
        required:true,
    },
    birthday:{
        type:String,
        required:true
    },
    isLockedOut:{
        type:Boolean,
        required:false,
        default: true
    },
    sessionStart: {
        type: Date
    },
    sessionEnd: {
        type: Date
    }
},{timestamps:true})

module.exports = mongoose.model("Admin", adminSchema);