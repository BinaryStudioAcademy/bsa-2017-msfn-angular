const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseType = new Schema({
    name: String,
    code: Number,
    isRemoved: Boolean
});



module.exports = mongoose.model('ExerciseType', ExerciseType);
