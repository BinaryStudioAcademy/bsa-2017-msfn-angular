const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeightControl = new Schema({
    weight: Number,
    boneWeight: Number,
    waterPct: Number,
    fatPct: Number,
    date: String
});

module.exports = mongoose.model('WeightControl', WeightControl);
