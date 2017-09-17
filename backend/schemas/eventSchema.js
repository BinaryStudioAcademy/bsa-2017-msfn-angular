const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Event = new Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        default: this.startDate,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    location: {
        name: String,
        coords: {
            lat: Number,
            lng: Number
        }
    },
    description: String,
    image: String,
    participants: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    followers: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: ObjectId,
            ref: 'Message'
        }
    ],
    isRemoved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Event', Event);
