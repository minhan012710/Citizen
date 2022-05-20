const mongoose = require("mongoose");
const wardSchema = require("./ward");

const districtSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    name: {
        type: String,
    },
    wards: [wardSchema]
}, { _id: false })

module.exports = districtSchema;