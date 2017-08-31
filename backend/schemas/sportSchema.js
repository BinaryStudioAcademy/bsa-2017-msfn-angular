const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Sport = new Schema({
    code: Number,
    name: String,
    description: String,
    icon: String,
    exercisesList: [
        {
            exercise: {
                type: ObjectId,
                ref: 'Exercise'
            }
        }
    ],
});

module.exports = mongoose.model('Sport', Sport);
