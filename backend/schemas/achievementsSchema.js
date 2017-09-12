const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Achievements = new Schema({
   name: String,
   message: String,
   icon: String,
   measureName: String,
   principle: 's>f' | 's<f' | 'f>v' | 'f<v', // s - startValue, f - finalValue, v - value field
   value: {
       required: false,
       type: Number,
   },
   isRemoved: {
       type: Boolean,
       default: false
   }
});



module.exports = mongoose.model('Achievements', Achievements);
