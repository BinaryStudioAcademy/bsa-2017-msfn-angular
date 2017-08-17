const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseType = new Schema({
    code: Number,
    name: String,
    isRemoved: Boolean
});



module.exports = mongoose.model('ExerciseType', ExerciseType);
