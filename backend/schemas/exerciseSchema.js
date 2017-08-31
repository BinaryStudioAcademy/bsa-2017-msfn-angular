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
    sports: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Sport'
        }
    ],
    description: String,
    image: String
});

module.exports = mongoose.model('Exercise', Exercise);
