const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Goal = new Schema({
    name: String,
    category: String,
    isRemoved: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model('Goal', Goal);
