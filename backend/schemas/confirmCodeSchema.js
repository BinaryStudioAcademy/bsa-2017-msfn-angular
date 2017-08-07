const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
var ttl = require('mongoose-ttl');

const ConfirmCode = new Schema({
    user: String,
    confirmCode: String,
});

let makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    for (var i = 0; i < 50; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

ConfirmCode.pre('save', function (next) {
    const userData = this;
    const userID = this.user;
    this.confirmCode = makeid();
    next();
});


ConfirmCode.plugin(ttl, { ttl: 3600000 });
module.exports = mongoose.model('ConfirmCode', ConfirmCode);
