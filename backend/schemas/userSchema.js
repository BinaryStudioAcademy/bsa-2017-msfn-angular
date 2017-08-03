const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const User = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isCoach: String,
    position: String,
});

User.pre('save', function(next) {
    const userData = this;

    if (!userData.isModified('password')) return next();

    bcrypt.genSalt(1012, function(err, salt) {
        bcrypt.hash(userData.password, null, null, function(err, hash) {
            userData.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', User);