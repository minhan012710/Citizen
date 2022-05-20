const mongoose = require('mongoose');
const residentialSchema = require('./residential');

const wardSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    name: {
        type: String,
    },
    residentials: [residentialSchema]
}, { _id: false });

module.exports = wardSchema;