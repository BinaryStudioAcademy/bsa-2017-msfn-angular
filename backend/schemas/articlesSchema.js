const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Articles = new Schema({
    title: String,
    preview: String,
    detail: String,
    image: String,
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    date: { type: Date, default: Date.now },
    isRemoved: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('Articles', Articles);
