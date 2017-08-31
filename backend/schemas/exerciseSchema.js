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
    externalId: { type : String , unique : true, required : false, dropDups: true }
});

module.exports = mongoose.model('Exercise', Exercise);
