const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Measurement = new Schema({
    measureName: String,
    measureUnits: [{
        conversionFactor: Number,
        unitName: String,
        unitType: String,
        isRemoved: {
            type: Boolean,
            default: false
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    }],
    isRemoved: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model('Measurement', Measurement);
