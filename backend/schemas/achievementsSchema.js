const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Achivements = new Schema({
   name: String,
   message: String,
   icon: String,
   goalType: String,
   isRemoved: {
       type: Boolean,
       default: false
   }
});



module.exports = mongoose.model('Achivements', Achivements);
