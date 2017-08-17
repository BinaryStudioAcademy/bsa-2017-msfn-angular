const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Exercise = new Schema({
    name: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: 'ExerciseType'
    },
    isRemoved: Boolean,
    sportsId:Array,
    description:String,
});

module.exports = mongoose.model('Exercise', Exercise);
