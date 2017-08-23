const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Goal = new Schema({
    name: String,
    type: String,
    isRemoved: { 
        type: Boolean,
        default: false 
    }
});



module.exports = mongoose.model('Goal', Goal);
