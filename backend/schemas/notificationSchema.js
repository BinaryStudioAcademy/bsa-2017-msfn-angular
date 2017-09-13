const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const Notification = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        index: true
    },
    message: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    isRemoved: {
        type: Boolean,
        default: false
    },
    creator: {
        type: ObjectId
    },
    category: {
        type: String,
        enum: ['follow']
    }
});

module.exports = mongoose.model('Notification', Notification);
