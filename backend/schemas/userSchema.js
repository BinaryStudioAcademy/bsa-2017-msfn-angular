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
        lowercase: true
    },
    secondaryEmails: [String],
    password: {
        type: String
    },
    isCoach: Boolean,
    isAdmin: Boolean,
    requestForCoaching: Boolean,
    position: Number,
    salt: {
        type: String,
    },
    googleID: String,
    facebookID: String,
    twitterID: String,
    follow: [ObjectId],
    userPhoto: String,
    gender: String,
    birthday: String,
    height: Number,
    weight: Number,
    location: String,
    about: String,
    activateToken: String,
    settings: {
        weight: String,
        trainingWeight: String,
        distance: String,
        temperature: String,
        timeFormat: String,
        timeZone: String,
        dateFormat: String,
        startWeek: String,
    },
    weightControl: [
        {
            weight: Number,
            boneWeight: Number,
            waterPct: Number,
            fatPct: Number,
            date: String
        }
    ],
    privacyHideFields: [String],
    activityLevel: Number,
    advicedCalories: Number,
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

User.pre('save', function (next) {
    const userData = this;
    if (!userData.isModified('password')) return next();
    bcrypt.genSalt(1012, (err, salt) => {
        userData.salt = salt;
        this.encryptPassword(this.password, (err, hash) => {
            if (err) return next(err);

            userData.password = hash;
            next();
        })
    });
});

User.pre('update', function (next) {
    const fields = this._update.$set;

    if (!fields || !fields.password) return next();
    bcrypt.genSalt(1012, (err, salt) => {
        fields.salt = salt;
        bcrypt.hash(fields.password, fields.salt, null, (err, hash) => {
            if (err) return next(err);

            fields.password = hash;
            next();
        });
    });
});

User.methods.checkPassword = function (password, callback) {
    this.encryptPassword(password, (err, hash) => {
        if (err) return callback(err);
        callback(err, (hash === this.password))
    });
};

User.methods.encryptPassword = function (password, callback) {
    bcrypt.hash(password, this.salt, null, (err, hash) => {
        callback(err, hash);
    });
};

User.methods.checkToken = function (token, callback) {
    callback(this.activateToken === token);
};

User.virtual('fullName').get(
    function() {
        return this.firstName + ' ' + this.lastName;
    }
);

module.exports = mongoose.model('User', User);
