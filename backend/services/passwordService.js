const ApiError = require('./apiErrorService');
const emailService = require('./emailService');
const userRepository = require('../repositories/userRepository');
const confirmService = require('./confirmService');
const decrypt = require('./decryptService');


function PasswordService() {
}

PasswordService.prototype.createConfirmCode = createConfirmCode;
PasswordService.prototype.checkConfirmCode = checkConfirmCode;

function createConfirmCode(body, callback) {
    confirmService.createCode(body, (err, data) => {
        if (err) {return callback(err); }
        const resetLink = config.hostAddress + '/restore-password/' + data.confirmCode;
        emailService.send(
            {
                to: body.email,
                subject: "Please reset your password",
                html: "<a href=\"" + resetLink + "\">" + resetLink + "</a>"
            },
            (err, data) => {
                if (err) return callback(err);
                if (data.rejected.length == 0) {
                    data.status = 'ok';
                }
                callback(null, data);
            }
        );
    });

}


function checkConfirmCode(body, callback) {
    body = decrypt(body.data);
    confirmService.checkExistCode(body, (err, data) => {
        if (err) {return callback(err); }

        if (data.status == 'ok') {
            const pass = body.password;
            userRepository.update(data.userId, { password: pass }, (err, result) => {
                if (result.ok == 1) {
                    userRepository.findById(data.userId, (err, userData) => {
                        if (err) { callback(err); }
                        confirmService.deleteCodes(data.userId, (err, data) => {
                            //need log error deleting
                        });
                        emailService.send(
                            {
                                to: userData.email,
                                subject: "Password changed",
                                html: "Hi, " + userData.firstName + ". <br>Your password was changed. <br>If you did not perform this action, you can recover access by entering " + userData.email + " into the form at <a href=\"https://msfn.com/forgot_password\">https://msfn.com/forgot_password</a>."
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
                    });
                    // const userData = data.user;

                }
            });
        }
    });
}

module.exports = new PasswordService();
