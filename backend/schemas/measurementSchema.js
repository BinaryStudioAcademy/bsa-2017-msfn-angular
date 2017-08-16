const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Measurement = new Schema({
    name: String,
    measureUnits: [{
        isRemoved: Boolean,
        conversionFactor: Number,
        unitName: String
    }]
});



module.exports = mongoose.model('Measurement', Measurement);