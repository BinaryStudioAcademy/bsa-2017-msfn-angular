const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseType = new Schema({
    name: String,
    code: Number
});



module.exports = mongoose.model('ExerciseType', ExerciseType);
