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
        const resetLink = "https://msfn.com/restore-password/" + data.confirmCode;
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
        if (data.status == 'ok') {
            const pass = body.password;
            userRepository.update(data.user._id, { password: pass }, (err, result) => {

                if (result.ok == 1) {
                    const userData = data.user;
                    confirmService.deleteCodes(data.user.email, (err, data) => {
                        //need log error deleting
                    });
                    emailService.send(
                        {
                            to: body.email,
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
                }
            });
        }
    });
}

module.exports = new PasswordService();
