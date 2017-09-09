const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ChatMessage = new Schema({
    message: String,
    sender: {
        type: ObjectId,
        ref: 'user',
        index: true
    },
    room: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    isRemoved: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('chatMessage', ChatMessage);
