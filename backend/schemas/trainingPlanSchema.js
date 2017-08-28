const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const TrainingPlan = new Schema({
    name: String,
    count: Number,
    days: Array,
    exercisesList: [
        {
            sets: [{
                value: String,
                value2: String
            }],
            exercise: {
                type: ObjectId,
                ref: 'Exercise'
            },
        }
    ],
    intervals: Array,
    trainingType: 'general' | 'interval',
    userID: String,
    gcalendar_id: String,
    isRemoved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('TrainingPlan', TrainingPlan);
