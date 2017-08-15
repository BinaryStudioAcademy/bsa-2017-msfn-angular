const ApiError = require('./apiErrorService');
const confirmCodeRepository = require('../repositories/confirmCodeRepository');
const userRepository = require('../repositories/userRepository');

class confirmService {
    constructor() { }

    createCode(body, callback) {
        userRepository.getUserByEmail(body.email, (err, data) => {
            if (err) return callback(err);

            if (data === null) {
                callback(new ApiError("User not found"));
            } else {
                const confirmData = {};
                confirmData.user = data._id;
                this.deleteCodes(data._id, (err) => {
                    if (err) {
                        callback(new ApiError("Error after trying to delete confirm code"));
                    }
                    confirmCodeRepository.add(confirmData, (err, data) => {
                        callback(err, data);
                    });
                });

            }
        });
    }

    checkExistCode(body, callback) {
        userRepository.getUserByEmail(body.email.toLowerCase(), (err, userData) => {

            if (err) return callback(err);

            if (userData === null) {
                callback(new ApiError("User not found"));
            } else {
                const user = userData._id;
                confirmCodeRepository.get({ confirmCode: body.confirmCode }, (err, data) => {
                    if (data.length > 0) {
                        const confirmData = data[0];
                        if (confirmData) {
                            callback(false, { status: 'ok', user: userData, codeId: confirmData._id });
                        } else {
                            callback(new ApiError("Wrong confirm code, or time expired"));
                        }
                        //const resetLink = "https://msfn.com/password_reset/" + data.confirmCode;

                    } else {
                        callback(new ApiError("Wrong confirm code, or time expired"));
                    }
                });
            }
        });
    }

    deleteCodes(userId, callback) {
        confirmCodeRepository.get({ user: userId }, (err, data) => {
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
            callback(deleteErr);
        });
    }
}

module.exports = new confirmService();