const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Food = new Schema({
    name: {
        type: String,
        required: true
    },
    foodType: {
        type: ObjectId,
        ref: 'FoodType'
    },
    kcal: Number,
    protein: Number,
    fat: Number,
    carbons: Number,
    vendor: String,
    description: String,
    measure: String,
    picture: String,
    customUserId: String,
    isPublished: {
        type: Boolean,
        default: false
    },
    isRemoved: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model('Food', Food);
