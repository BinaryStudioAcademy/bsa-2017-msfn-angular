const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;

const LaunchedTraining = new Schema({
    name: String,
    userId: ObjectId,
    plan: ObjectId,
    isRemoved: {
        type: Boolean,
        default: false
    },
    isCircled: Boolean,
    exercises: Array
});

module.exports = mongoose.model('LaunchedTraining', LaunchedTraining);
