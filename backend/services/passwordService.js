const ApiError = require('./apiErrorService');
const emailService = require('./emailService');
const userRepository = require('../repositories/userRepository');
const confirmCodeRepository = require('../repositories/confirmCodeRepository');

function PasswordService() {
}

PasswordService.prototype.createConfirmCode = createConfirmCode;
PasswordService.prototype.checkConfirmCode = checkConfirmCode;

function createConfirmCode(body, callback) {

    userRepository.getUserByEmail(body.email, (err, data) => {
        "use strict";
        if (err) return callback(err);

        if (data === null) {
            callback(new ApiError("User not found"));
        } else {

            const confirmData = {};
            confirmData.user = data._id;
            confirmCodeRepository.get({ user: data._id }, (err, data) => {
                let deleteErr = false;
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        const confirmCodeId = data[i];
                        confirmCodeRepository.deleteById(confirmCodeId, (err, data) => {
                            if (err) {
                                deleteErr = true;
                            }
                        });
                    }
                }
                if (!deleteErr) {
                    confirmCodeRepository.add(confirmData, (err, data) => {
                        const resetLink = "https://msfn.com/password_reset/" + data.confirmCode;
                        emailService.send(
                            {
                                to: body.email,
                                subject: "Please reset your password",
                                html: "<a href=\"" + resetLink + "\">" + resetLink + "</a>"
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
                }
            });

        }
    });
}


function checkConfirmCode(body, callback) {
    userRepository.getUserByEmail(body.email, (err, userData) => {
        "use strict";

        if (err) return callback(err);

        if (userData === null) {
            callback(new ApiError("User not found"));
        } else {
            const user = userData._id;
            confirmCodeRepository.get({ user: user }, (err, data) => {
                if (data.length > 0) {
                    const confirmData = data[0];
                    if (confirmData && confirmData.confirmCode === body.confirmCode) {
                        const pass = body.password;
                        userRepository.update(user, { password: pass }, (err, result) => {

                            if (result.ok == 1) {

                                confirmCodeRepository.deleteById(confirmData._id, (err, data) => {
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
                    } else {
                        callback(new ApiError("Wrong confirm code, or time expired"));
                    }
                    //const resetLink = "https://msfn.com/password_reset/" + data.confirmCode;

                    // callback(null, data);
                } else {
                    callback(new ApiError("Wrong confirm code, or time expired"));
                }
            });
        }
    });
}

module.exports = new PasswordService();
