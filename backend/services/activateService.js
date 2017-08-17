const ApiError = require('./apiErrorService');
const emailService = require('./emailService');
const confirmCodeRepository = require('../repositories/confirmCodeRepository');
const confirmService = require('./confirmService');
const userRepository = require('../repositories/userRepository')

function ActivateService() {}

ActivateService.prototype.resendActivateCode = resendActivateCode;
ActivateService.prototype.checkActivateCode = checkActivateCode;

function resendActivateCode(body, callback) {

    userRepository.getUserByEmail(body.email, (err, user) => {
        if (err) return callback(err);

        if (user === null) {
            callback(new ApiError("User not found"));
        } else {
            confirmCodeRepository.get({
                user: user._id
            }, (err, confirmCode) => {
                if (err) {
                    return callback(err);
                }
                emailService.send({
                    to: body.email,
                    subject: 'Your MSFN registration',
                    html: '<table><tr><td>Additional request for account registration! ' +
                        '!</td></tr> <tr><td> Please, follow this link to activate your account: ' +
                        '<a href="http://localhost:3060/confirmation/registration/' + confirmCode.activateToken + '">' + 'Activate account </a> </td></tr></table>'
                }, (err, data) => {
                    if (err) return callback(err);
                    if (data.rejected.length == 0) {
                        data.status = 'ok';
                    }
                    callback(null, data);
                });
            })
        }
    })
}

function checkActivateCode(token, callback) {
    userRepository.getUserByToken(token, (err, user) => {
        if (err) {
            return callback(err);
        } else if (!user) {
            return callback(new ApiError("Current token wrong or has expired"));
        }
        user.checkToken(token, status => {
            if (status) {
                // user.activateToken = '';
                userRepository.update(user.id, {activateToken: ''}, callback);
            } else {
                callback(new ApiError("Current token wrong or has expired"));
            }
        })
    })
}


module.exports = new ActivateService();
