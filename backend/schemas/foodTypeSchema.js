const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodType = new Schema({
    name: { 
        type : String, 
        unique : true, 
        required : true 
    },
    parentType: String,
    description: String,
    parentFood: String,
    picture: String,
    isRemoved: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model('FoodType', FoodType);
