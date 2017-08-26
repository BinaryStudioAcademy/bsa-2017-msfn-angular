const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

const LaunchedTraining = new Schema({
    name: String,
    count: Number,
    days: Array,
    exercisesList: [{
        name: String,
        sets: [{
            value: String,
            value2: String
        }],
        id: String,
        exerciseType: String,
        description: String,
    }],
    intervals: Array,
    trainingType: 'general' | 'interval',
    userID: String,
    isRemoved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('LaunchedTraining', LaunchedTraining);
