const ApiError = require('./apiErrorService');
const UserService = require('./userService');
const userRepository = require('../repositories/userRepository');
const confirmCodeRepository = require('../repositories/confirmCodeRepository');

function PasswordService() {

}

PasswordService.prototype.createConfirmCode = createConfirmCode;

function createConfirmCode(body, callback) {

    userRepository.getUserByEmail(body.email, (err, data) => {
        "use strict";
        if (err) return callback(err);

        if (data === null) {
            callback(new ApiError("User not found"));
        } else {
            const confirmData = {};
            confirmData.user = data._id;
            confirmCodeRepository.add(confirmData, (err, data) => {
                console.log(data.confirmCode);
                callback(err, data);
            });
        }
    });
}


function checkConfirmCode(id, body, callback) {
    userRepository.getById(id, (err, data) => {
        "use strict";
        if (err) return callback(err);

        if (data === null) {
            callback(new ApiError("User not found"));
        } else {
            // ConfirmCodeRepository.update(id, body, callback);
        }
    })
}

module.exports = new PasswordService();
