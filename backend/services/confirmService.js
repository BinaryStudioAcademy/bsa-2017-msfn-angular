const ApiError = require('./apiErrorService');
const confirmCodeRepository = require('../repositories/confirmCodeRepository');
const userRepository = require('../repositories/userRepository');

class confirmService {
    constructor() { }

    createCode(body, callback) {
        userRepository.getUserByEmail(body.email, (err, data) => {
            if (data == null) {
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
        confirmCodeRepository.get({ filter: { confirmCode: body.confirmCode } }, (err, data) => {
            if (data.length > 0) {
                const confirmData = data[0];
                const user = confirmData.user;
                if (confirmData) {
                    callback(false, { status: 'ok', userId: user, codeId: confirmData._id });
                } else {
                    callback(new ApiError("Wrong confirm code, or time expired"));
                }
            } else {
                callback(new ApiError("Wrong confirm code, or time expired"));
            }
        });
    }

    deleteCodes(userId, callback) {
        confirmCodeRepository.get({ user: userId }, (err, data) => {
            let deleteErr = false;
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const confirmCodeId = data[i];
                    confirmCodeRepository.deleteCode(confirmCodeId._id, (err, data) => {
                        if (err) {
                            deleteErr = true;
                        }
                    });
                }
            }
            return callback(deleteErr);
        });
    }
}

module.exports = new confirmService();