const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserGoal = new Schema({
    category: String,
    value: Number,
    isRemoved: {
        type: Boolean,
        default: false
    },
    deadline: Date,
    startTime: Date,
    createdByUser: String
});

module.exports = mongoose.model('UserGoal', UserGoal);
