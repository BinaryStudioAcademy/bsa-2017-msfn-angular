const ApiError = require('./apiErrorService');
const emailService = require('./emailService');
const userRepository = require('../repositories/userRepository');
const activateCodeRepository = require('../repositories/activateCodeRepository');

class activateService {

    constructor() {
        this.currentUserId = '5989ab5d64b3720631f3c350';
    }

    createActivateCode(body, callback) {

        userRepository.findById(body._id, (err, data) => {
            "use strict";
            if (err) return callback(err);

            if (data === null) {
                callback(new ApiError("User not found"));
            } else {

                const activateData = {};
                activateData.user = data._id;
                activateCodeRepository.get({
                    user: data._id
                }, (err, data) => {
                    let deleteErr = false;
                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            const activateCodeId = data[i];
                            activateCodeRepository.deleteById(activateCodeId, (err, data) => {
                                if (err) {
                                    deleteErr = true;
                                }
                            });
                        }
                    }
                    if (!deleteErr) {
                        activateCodeRepository.add(activateData, (err, data) => {
                            const activateLink = "https://msfn.com/activate/" + data.activateCode;
                            emailService.send({
                                    to: body.email,
                                    subject: "Please activate your email",
                                    html: "<a href=\"" + activateLink + "\">" + activateLink + "</a>"
                                },
                                (err, data) => {
                                    "use strict";
                                    if (err) return next(err);
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

    checkActivateCode(body, callback) {

        userRepository.findById(body._id, (err, userData) => {
            "use strict";
    
            if (err) return callback(err);
    
            if (userData === null) {
                callback(new ApiError("User not found"));
            } else {
                const user = userData._id;
                activateCodeRepository.get({ user: user }, (err, data) => {
                    if (data.length > 0) {
                        const activateData = data[0];
                        if (activateData && activateData.activateCode === body.activateCode) {
                            const pass = body.password;
                            userRepository.update(user, { password: pass }, (err, result) => {
    
                                if (result.ok == 1) {
    
                                    activateCodeRepository.deleteById(activateData._id, (err, data) => {
                                        //need log error deleting
                                    });
    
                                    emailService.send(
                                        {
                                            to: body.email,
                                            subject: "Email now active!",
                                            html: "Hi, " + userData.firstName + ". <br>Your email has been activated. <br>If you did not perform this action, you can recover access by entering " + userData.email + " into the form at <a href=\"https://msfn.com/forgot_password\">https://msfn.com/forgot_password</a>."
                                        },
                                        (err, data) => {
                                            "use strict";
                                            if (err) return next(err);
                                            if (data.rejected.length == 0) {
                                                data.status = 'ok';
                                            }
                                            callback(null, data);
                                        }
                                    );
                                }
                            });
                        } else {
                            callback(new ApiError("Wrong activation code, or email is already active"));
                        }
                        //const resetLink = "https://msfn.com/password_reset/" + data.confirmCode;
    
                        // callback(null, data);
                    } else {
                        callback(new ApiError("Wrong activation code, or email is already active"));
                    }
                });
            }
        });
    }

}

module.exports = new activateService();
