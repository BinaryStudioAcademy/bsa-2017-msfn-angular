const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivateCode = new Schema({
    user: String,
    activateCode: String,
});

let makeid = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    for (let i = 0; i < 50; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

ActivateCode.pre('save', function (next) {
    const userData = this;
    const userID = this.user;
    this.activateCode = makeid();
    next();
});

module.exports = mongoose.model('ActivateCode', ActivateCode);
