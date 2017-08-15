const ApiError = require('./apiErrorService');
const emailService = require('./emailService');
const confirmCodeRepository = require('../repositories/confirmCodeRepository');
const confirmService = require('./confirmService');
const userRepository = require('../repositories/userRepository')

function ActivateService() {}

ActivateService.prototype.checkActivateCode = checkActivateCode;
ActivateService.prototype.genNewRootMail = genNewRootMail;
ActivateService.prototype.checkNewRootMail = checkNewRootMail;


function checkActivateCode(token, callback) {
    userRepository.getUserByToken(token, (err, user) => {
        if (err) {
            return callback(err);
        }
        user.checkToken(token, status => {
            if (status) {
                user.activateToken = '';
                userRepository.update(user.id, user, callback);
            } else {
                callback(new ApiError("Wrong token"));
            }
        })
    })
}

function genNewRootMail(body, callback) {

    userRepository.getUserByEmail(body.email, (err, data) => {
        "use strict";
        if (err) return callback(err);

        if (data === null) {
            callback(new ApiError("User not found"));
        } else {

            const confirmData = {};
            confirmData.user = data._id;
            // Adding new email to be changed as root
            if (body.newRootMail) {
                confirmData.newRootMail = body.newRootMail;
            }
            confirmCodeRepository.get({
                user: data._id
            }, (err, data) => {
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
                        // const newRootMailLink = "http://localhost:3060/api/user/activate/changemail/" + data.confirmCode;
                        const newRootMailLink = "http://localhost:3060/api/user/activate/changemail/" + data.confirmCode;
                        emailService.send({
                                to: body.newRootMail,
                                subject: "Link to change your main email",
                                html: "<a href=\"" + newRootMailLink + "\">" + newRootMailLink + "</a>"
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
            });

        }
    });
}

function checkNewRootMail(body, callback) {

    confirmCodeRepository.get({
        filter: {
            confirmCode: body
        }
    }, (err, data) => {
        if (data.length > 0) {
            const confirmData = data[0];
            if (confirmData && confirmData.confirmCode === body) {
                const pass = body.password;
                userRepository.update(confirmData.user, {
                    email: confirmData.newRootMail
                }, (err, result) => {

                    if (result.ok == 1) {

                        confirmCodeRepository.deleteById(confirmData._id, (err, data) => {
                            //need log error deleting
                        });

                        emailService.send({
                                to: body.email,
                                subject: "Change main email on MSFN",
                                html: "We would like to inform you that you've succesfully set this email as your main one. <a href=\"https://msfn.com\">https://msfn.com</a>."
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
            // callback(null, data);
        } else {
            callback(new ApiError("Wrong confirm code, or time expired"));
        }
    });
}

module.exports = new ActivateService();
