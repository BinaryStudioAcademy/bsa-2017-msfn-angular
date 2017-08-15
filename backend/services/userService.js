const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');
const decrypt = require('./decryptService');
const emailService = require('../services/emailService');

function UserService() {

}

UserService.prototype.addItem = addItem;
UserService.prototype.updateItem = updateItem;

function addItem(body, callback) {
    userRepository.getUserByEmail(decrypt(body.email).email.toLowerCase(), (err, data) => {
        if (err) return callback(err);

        if (data === null) {
            body.password = decrypt(body.password).password;
            body.email = decrypt(body.email).email;
            userRepository.add(body, callback);

            emailService.send({
                to: body.email,
                subject: 'Your MSFN registration',
                html: '<table><tr><td>Congratulations, ' +
                    body.firstName +
                    '!</td></tr> <tr><td>You have become a part of our fantastic fitness network!</td></tr> <tr><td> Please, follow this link to activate your account: ' +
                    '<a href="http://localhost:3060/api/user/activate?email=' + body.email + '&token=' + body.activateToken + '">' + 'Activate account </a> </td></tr></table>'
            }, (err, data) => {
                if (err) return callback(err);
                if (data.rejected.length == 0) {
                    data.status = 'ok';
                }
                callback(null, data);
            }
        );
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

                userRepository.update(id, body, callback);
            });
        }
    })
}

module.exports = new UserService();
