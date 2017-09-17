const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const Tribe = new Schema({
    name: String,
    creator: {
        type: ObjectId,
        ref: 'User'
    },
    description: String,
    members: [{
        type: ObjectId,
        ref: 'User'
    }],
    banned: [{
        type: ObjectId,
        ref: 'User'
    }],
    postWithOwnName: {
        type: Boolean,
        default: false
    },
    isRemoved: {
        type: Boolean,
        default: false
    },
    route: String
});


module.exports = mongoose.model('Tribe', Tribe);
