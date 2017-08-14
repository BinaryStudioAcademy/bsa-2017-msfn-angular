const ApiError = require('./apiErrorService');
const emailService = require('./emailService');

function ActivateService() {}

ActivateService.prototype.makeid = makeid;
ActivateService.prototype.checkActivateCode = checkActivateCode;
ActivateService.prototype.sendRegistrationLetter = sendRegistrationLetter;

function makeid() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    for (let i = 0; i < 50; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function checkActivateCode(body, callback) {
    const userRepository = require('../repositories/userRepository');

    userRepository.getUserByEmail(body.email, (err, user) => {
        if (err) {
            return callback(err);
        }
        user.checkToken(body.token, status => {
            if (status) {
                user.activateToken = '';
                userRepository.update(user.id, user, callback);
            } else {
                callback(new ApiError("Wrong token"));
            }
        })
    })
}

function sendRegistrationLetter(user) {
    // TO CHANGE URL in letter for stable site address
    emailService.send(
        {
            to: user.email,
            subject: 'Your MSFN registration',
            html: '<table><tr><td>Congratulations, ' +
                user.firstName +
                '!</td></tr> <tr><td>You have become a part of our fantastic fitness network!</td></tr> <tr><td> Please, follow this link to activate your account: ' +
                '<a href="http://localhost:3060/api/user/activate?email=' + user.email + '&token=' + user.activateToken + '">' + 'Activate account </a> </td></tr></table>'
        },
        (err, data) => {
            "use strict";
            if (err) return callback(err);
            if (data.rejected.length == 0) {
                data.status = 'ok';
            }
            callback(null, data);
        }
    );
}

module.exports = new ActivateService();
