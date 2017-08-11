const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');
const mongoose = require('mongoose');
var objID = mongoose.Types;

class activateService {

    constructor() {this.currentUserId = '5989ab5d64b3720631f3c350';}

    getToken(data, callback) {}
    sendToken(data, callback) {}

}

module.exports = new activateService();
