const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Achievements = new Schema({
   name: String,
   message: String,
   icon: String,
   measureName: String,
   isRemoved: {
       type: Boolean,
       default: false
   }
});



module.exports = mongoose.model('Achievements', Achievements);
