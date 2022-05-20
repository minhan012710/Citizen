const mongoose = require('mongoose');

const residentialSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    name: {
        type: String,
    }
}, { _id: false });

module.exports = residentialSchema;