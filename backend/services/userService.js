const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');
const decrypt = require('./decryptService');

function UserService() {

}

UserService.prototype.addItem = addItem;
UserService.prototype.updateItem = updateItem;

function addItem(body, callback) {
    userRepository.getUserByEmail(decrypt(body.email).email, (err, data) => {
        if (err) return callback(err);

        if (data === null) {
            body.password = decrypt(body.password).password;
            body.email = decrypt(body.email).email;
            userRepository.add(body, callback);
        } else {
            callback(new ApiError("User with such email already exists"));
        }
    });
}

function updateItem(id, body, callback) {
    userRepository.getById(id, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError("User not found"));
        } else {
            userRepository.getUserByEmail(body.email, (err, existingUser) => {
                if (err) return callback(err);

                if (existingUser && existingUser.id !== id) return callback(new ApiError("User with such email already exists"));

                if (body.password) {
                    body.password = decrypt(body.password).password;
                }

                userRepository.update(id, body, callback);
            });
        }
    })
}

module.exports = new UserService();
