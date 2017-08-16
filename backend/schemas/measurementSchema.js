const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Measurement = new Schema({
    name: String,
    code: Number,
    isRemoved: Boolean,
    values: [String]
});



module.exports = mongoose.model('Measurement', Measurement);