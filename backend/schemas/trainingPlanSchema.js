const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const TrainingPlan = new Schema({
    name: String,
    count: Number,
    days: Array,
    exerciseList: Array,
    intervals: Array,
    type: 'general'|'interval',
    userID: ObjectId
});

module.exports = mongoose.model('TrainingPlan', TrainingPlan);
