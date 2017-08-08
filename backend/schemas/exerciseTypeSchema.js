const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseType = new Schema({
    name: String,
    id: Number
});


ConfirmCode.pre('save', function (next) {
    const userData = this; // DO with it
    next();
});


module.exports = mongoose.model('ExerciseType', ExerciseType);
