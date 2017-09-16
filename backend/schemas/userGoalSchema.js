const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserGoal = new Schema({
    goal: {
        type: Schema.Types.ObjectId,
        ref: 'Goal'
    },
    startValue: Number,
    endValue: Number,
    isRemoved: {
        type: Boolean,
        default: false
    },
    deadline: Date,
    startTime: Date,
    createdByUser: String
});

module.exports = mongoose.model('UserGoal', UserGoal);
