const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Exercise = new Schema({
    name: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: 'ExerciseType'
    },
    measure: String,
    isRemoved: Boolean,
    sportsId:Array,
    description:String,
    image: Array,
    externalId: String
});

module.exports = mongoose.model('Exercise', Exercise);
