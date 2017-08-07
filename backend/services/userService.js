const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');

function UserService() {

}

UserService.prototype.addItem = addItem;
UserService.prototype.updateItem = updateItem;

function addItem(body, callback) {
    userRepository.getUserByEmail(body.email, (err, data) => {
        "use strict";
        if (err) return callback(err);

        if (data === null) {
            userRepository.add(body, callback);
        } else {
            callback(new ApiError("User with such email already exists"));
        }
    });
}

function updateItem(id, body, callback) {
    userRepository.getById(id, (err, data) => {
        "use strict";
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError("User not found"));
        } else {
            userRepository.getUserByEmail(body.email, (err, existingUser) => {
                if (err) return callback(err);

                if (existingUser && existingUser.id !== id) return callback(new ApiError("User with such email already exists"));

                userRepository.update(id, body, callback);
            });
        }
    })
}

module.exports = new UserService();
