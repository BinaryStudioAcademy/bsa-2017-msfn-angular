const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalType = new Schema({
    name: String
});



module.exports = mongoose.model('GoalType', GoalType);
