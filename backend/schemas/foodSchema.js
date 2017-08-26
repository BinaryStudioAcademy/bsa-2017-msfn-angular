const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Food = new Schema({
    foodType: String,
    foodUnits: [{
        conversionFactor: Number,
        unitName: String,
        unitType: String,
        isRemoved: {
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
