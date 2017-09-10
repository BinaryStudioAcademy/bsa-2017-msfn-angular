const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Testimonial = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    coach: {
        type: ObjectId,
        ref: 'User'
    },
    date: Date,
    body: String,
    isRemoved: Boolean
});

module.exports = mongoose.model('Testimonial', Testimonial);
