const mongoose = require("mongoose");
const districtSchema = require("./district");
const Schema = mongoose.Schema;

const provinceSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required:true,
    },
    districts: [districtSchema]
})

module.exports = mongoose.model("Location", provinceSchema);