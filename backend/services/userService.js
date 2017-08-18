const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');
const decrypt = require('./decryptService');
const emailService = require('../services/emailService');
const config = require('../config');

function UserService() {

}

UserService.prototype.addItem = addItem;
UserService.prototype.updateItem = updateItem;
UserService.prototype.makeid = makeid;
UserService.prototype.addEmailToItem = addEmailToItem;

function makeid() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    for (let i = 0; i < 50; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
// Add new user to DB
function addItem(body, callback) {
    userRepository.getUserByEmail(decrypt(body.email).email.toLowerCase(), (err, data) => {
        if (err) return callback(err);

        // Check user with such email does not exist already
        if (data === null) {
            body.password = decrypt(body.password).password;
            body.email = decrypt(body.email).email;
            // Generating registration confirmation "TOKEN" for user
            body.activateToken = makeid();
            // Add newly created user into DB
            userRepository.add(body, callback);
            // SEND REGISTRATION MAIL
            // TO CHANGE URL in letter for stable site address
            emailService.send({
                to: body.email,
                subject: 'Your MSFN registration',
                html: '<table><tr><td>Congratulations, ' +
                    body.firstName +
                    '!</td></tr> <tr><td>You have become a part of our fantastic fitness network!</td></tr> <tr><td> Please, follow this link to activate your account: ' +
                    '<a href="' + config.hostAddress + '/confirmation/registration/' + body.activateToken + '">' + 'Activate account </a> </td></tr></table>'
            }, (err, data) => {
                if (err) return callback(err);
                if (data.rejected.length == 0) {
                    data.status = 'ok';
                }
                callback(null, data);
            });
        } else {
            callback(new ApiError("User with such email already exists"));
        }
    });
}

// Edit user in DB
function updateItem(id, body, callback) {
    userRepository.getById(id, (err, data) => {
        if (err) return callback(err);

        if (data === null) {
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

function addEmailToItem(id, body, callback) {

    const newSecondaryEmail = body.newSecondaryEmail;

    userRepository.getById(id, (err, data) => {
        if (err) {
            return callback(new ApiError(err));
        } else if (data.secondaryEmails.indexOf(newSecondaryEmail) >= 0) {
            return callback(new ApiError("New email is already in list"));
        } else {
            userRepository.update(id, {
                $addToSet: {
                    secondaryEmails: newSecondaryEmail.toLowerCase()
                }
            }, (err, result) => {
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        }
    });

}

module.exports = new UserService();
