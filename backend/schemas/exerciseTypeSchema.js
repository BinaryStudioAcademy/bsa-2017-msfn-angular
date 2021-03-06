const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseType = new Schema({
    name: String,
    isRemoved: Boolean,
    externalId: String
});

module.exports = mongoose.model('ExerciseType', ExerciseType);
