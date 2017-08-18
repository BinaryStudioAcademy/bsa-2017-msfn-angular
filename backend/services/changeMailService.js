const ApiError = require('./apiErrorService');
const emailService = require('./emailService');
const confirmCodeRepository = require('../repositories/confirmCodeRepository');
const confirmService = require('./confirmService');
const userRepository = require('../repositories/userRepository');
const config = require('../config');

function ChangeMailService() {}

ChangeMailService.prototype.genNewRootMail = genNewRootMail;
ChangeMailService.prototype.checkNewRootMail = checkNewRootMail;

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
                        const newRootMailLink = config.hostAddress + '/confirmation/rootemail/' + data.confirmCode;
                        emailService.send({
                                to: body.newRootMail,
                                subject: "Link to change your main email",
                                // html: "<a href=\"" + newRootMailLink + "\">" + newRootMailLink + "</a>"
                                html: '<table><tr><td>You have sent a mail change request' + 
                                '!</td></tr> <tr><td>Please, follow this link to confirm the changes : <a href="' + newRootMailLink + '">Activate changes </a></td></tr>' + 
                                '<tr><td>Also you can copy and past this code in the field on the page: ' + data.confirmCode +'</td></tr></table>'
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
    // body has token
    confirmCodeRepository.get({
        // Find user by received token
        filter: {
            confirmCode: body
        }
    }, (err, data) => {
        if (data.length > 0) {
            const confirmData = data[0];
            if (confirmData && confirmData.confirmCode === body) {
                const pass = body.password;

                userRepository.findById(confirmData.user, (err, user) => {
                    if (!err) {
                        const oldEmail = user.email;
                        // Swap new root email with old one

                        let newSecondaryEmails = [...user.secondaryEmails];
                        let newMailIndex = newSecondaryEmails.indexOf(confirmData.newRootMail);
                        newSecondaryEmails.splice(newMailIndex, 1);
                        newSecondaryEmails.push(oldEmail);

                        userRepository.update(confirmData.user, {
                            email: confirmData.newRootMail.toLowerCase(),
                            secondaryEmails: newSecondaryEmails
                        }, (err, result) => {

                            // if (result.ok == 1) {
                            if (!err) {

                                confirmCodeRepository.deleteById(confirmData._id, (err, data) => {
                                    //need log error deleting
                                });
                                emailService.send({
                                        to: confirmData.newRootMail,
                                        subject: "Changed root email on MSFN",
                                        html: "We would like to inform you that you've succesfully set this email as your root one. <a href=\"https://msfn.com\">https://msfn.com</a>."
                                    },
                                    (err, data) => {
                                        "use strict";
                                        if (err) return callback(err);
                                        if (data.rejected.length == 0) {
                                            data.status = 'ok';
                                            data.operationResult = {
                                                newRootMail: confirmData.newRootMail,
                                                newSecondaryEmails
                                            }
                                        }
                                        callback(null, data);
                                    }
                                );
                            }
                        });
                    } else {
                        callback(new ApiError("Wrong confirm code, or time expired"));
                    }
                })

            } else {
                callback(new ApiError("Wrong confirm code, or time expired"));
            }
            // callback(null, data);
        } else {
            callback(new ApiError("Wrong confirm code, or time expired"));
        }
    });
}

module.exports = new ChangeMailService();
