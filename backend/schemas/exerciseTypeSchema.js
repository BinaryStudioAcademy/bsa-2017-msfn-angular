const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const ExerciseType = new Schema({
    name: String,
    isRemoved: Boolean,
    externalId: String
});

autoIncrement.initialize(mongoose.connection);
ExerciseType.plugin(autoIncrement.plugin, { model: 'ExerciseType', field: 'code'});

module.exports = mongoose.model('ExerciseType', ExerciseType);
