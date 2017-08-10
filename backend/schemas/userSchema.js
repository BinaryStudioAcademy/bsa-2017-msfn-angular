const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt-nodejs');


const User = new Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isCoach: Boolean,
    isAdmin: Boolean,
    position: Number,
    salt: {
        type: String,
    },
    googleID: String,
    facebookID: String,
    twitterID: String,
    follow: [ObjectId],

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

User.pre('update', function(next) {
  const fields = this._update.$set;

  if (!fields.password) return next();

  bcrypt.genSalt(1012, (err, salt) => {
    fields.salt = salt;
    bcrypt.hash(fields.password, fields.salt, null, (err, hash) => {
      if (err) return next(err);

      fields.password = hash;
      next();
    });
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
