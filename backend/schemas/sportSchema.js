const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sport = new Schema({
    code: Number,
    name: String,
    description: String
});

module.exports = mongoose.model('Sport', Sport);