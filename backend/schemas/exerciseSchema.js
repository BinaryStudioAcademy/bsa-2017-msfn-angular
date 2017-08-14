const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exercise = new Schema({
    name: String,
    typeId:Number,
    isRemoved: Boolean,
    sportsId:Array,
    description:String,
});


module.exports = mongoose.model('Exercise', Exercise);
