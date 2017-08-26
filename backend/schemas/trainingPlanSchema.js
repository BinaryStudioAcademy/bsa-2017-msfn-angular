const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const TrainingPlan = new Schema({
    name: String,
    count: Number,
    days: Array,
    exercisesList: [
        {
            name: String,
            sets: [{
                value: String,
                value2: String
            }],
            id: String,
            exerciseType: String,
            description: String,
        }
    ],
    intervals: Array,
    trainingType: 'general' | 'interval',
    userID: String,
    isRemoved: Boolean,

});

module.exports = mongoose.model('TrainingPlan', TrainingPlan);
