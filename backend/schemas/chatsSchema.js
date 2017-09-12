const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Chat = new Schema({
    room: {
        type: String
    },
    users: [{
        type: ObjectId,
        ref: 'User'
    }],
    isRemoved: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('chat', Chat);
