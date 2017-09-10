const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Testimonial = new Schema({
    userId: ObjectId,
    coachId: ObjectId,
    date: Date,
    body: String,
    isRemoved: Boolean
});

module.exports = mongoose.model('Testimonial', Testimonial);
