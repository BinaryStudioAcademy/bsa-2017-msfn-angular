const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const FoodType = new Schema({
    name: { 
        type : String, 
        unique : true, 
        required : true 
    },
    parentType: {
        type: ObjectId,
        ref: 'FoodType'
    },
    depthLvl: Number,
    description: String,
    parentFood: String,
    picture: String,
    isRemoved: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model('FoodType', FoodType);
