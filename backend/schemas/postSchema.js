const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Post = new Schema({
    userId: ObjectId,
    date: {
        type: Date,
        default: Date.now
    },
    body: String,
    isRemoved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Post', Post);
