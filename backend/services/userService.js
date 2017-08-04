const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');

function UserService() {

}

UserService.prototype.addItem = addItem;
UserService.prototype.updateItem = updateItem;

function addItem(body, callback) {
    userRepository.getUserByEmail(body.email, function(err, data){
        "use strict";
        if (err) return callback(err);

        if (data === null) {
            userRepository.add(body, callback);
        } else {
            callback("User with such email already exists");
        }
    });
}

function updateItem(id, body, callback) {
    userRepository.setObjPropsById(id, body, callback);
}

module.exports = new UserService();
