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
    salt: String
});

User.pre('save', function(next) {
    const userData = this;

    if (!userData.isModified('password')) return next();

    bcrypt.genSalt(1012, (err, salt) => {
        userData.salt = salt;
        this.encryptPassword(this.password, (err, hash) => {
            "use strict";
            if (err) return next(err);

            userData.password = hash;
            next();
        })
    });
});

User.methods.checkPassword = function(password, callback){
    "use strict";
    this.encryptPassword(password, (err, hash) => {
        if (err) return callback(err);
        callback(err, (hash === this.password))
    });
};

User.methods.encryptPassword = function(password, callback){
    "use strict";
    bcrypt.hash(password, this.salt, null, (err, hash) => {
        callback(err, hash);
    });
};

module.exports = mongoose.model('User', User);
