const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Post = new Schema({
    title: String,
    text: String,
    image: String,
    author: {
        type: ObjectId,
        ref: 'user'
    },
    tribe: {
        type: ObjectId,
        ref: 'tribe'
    },
    views: Number,
    comments: [{
        author: {
            type: ObjectId,
            ref: 'user'
        },
        text: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Post', Post);
