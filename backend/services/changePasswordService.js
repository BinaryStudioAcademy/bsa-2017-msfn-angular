const decrypt = require('./decryptService'),
    ApiError = require('./apiErrorService'),
    userRepository = require('../repositories/userRepository');

module.exports = function changePassword(req, callback) {
    req.body = decrypt(req.body.data)
    const id = req.session.passport.user;
    const pass = req.body.password;
    const newPass = req.body.newPassword;

    userRepository.getById(id, (err, user) => {
        if (err) { return callback(err); }

        if (!pass) {
            userRepository.update(id, { password: newPass }, callback);
        } else {
            user.checkPassword(pass, (err, result) => {
                if (err) { return callback(err); }

                if (result) {
                    userRepository.update(id, { password: newPass }, callback);
                } else {
                    return callback(new ApiError("incorect current password"));
                }
            })
        }

    });
}
