const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodType = new Schema({
    name: String,
    description: String,
    picture: String,
    isRemoved: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model('FoodType', FoodType);
