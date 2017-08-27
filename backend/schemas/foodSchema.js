const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Food = new Schema({
    name: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        default: 'Other'
    },
    kcal: Number,
    protein: Number,
    fat: Number,
    carbons: Number,
    vendor: String,
    description: String,
    picture: String,
    customUserId: String,
    isRemoved: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model('Food', Food);
