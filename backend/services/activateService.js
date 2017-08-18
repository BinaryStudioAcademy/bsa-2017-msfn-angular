const ApiError = require('./apiErrorService');
const emailService = require('./emailService');
const decryptService = require('./decryptService');
const confirmCodeRepository = require('../repositories/confirmCodeRepository');
const confirmService = require('./confirmService');
const userRepository = require('../repositories/userRepository')

function ActivateService() {}

ActivateService.prototype.resendActivateCode = resendActivateCode;
ActivateService.prototype.checkActivateCode = checkActivateCode;

function resendActivateCode(body, callback) {
    body = decryptService(body.data)
    userRepository.getUserByEmail(body.email, (err, user) => {
        if (err) return callback(err);

        if (user === null) {
            callback(new ApiError("User not found"));
        } else {
            emailService.send({
                to: user.email,
                subject: 'Your MSFN registration',
                html: '<table><tr><td>Additional request for account registration! ' +
                    '!</td></tr> <tr><td> Please, follow this link to activate your account: ' +
                    '<a href="' + config.host.hostAddress + '/confirmation/registration/' + user.activateToken + '">' + 'Activate account </a> </td></tr></table>'
            }, (err, data) => {
                if (err) return callback(err);
                if (data.rejected.length == 0) {
                    data.status = 'ok';
                }
                callback(null, data);
            });
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
                userRepository.update(user.id, {
                    activateToken: ''
                }, function (err, data) {
                    if (!err) {
                        userRepository.findById(user.id, function (err, user) {
                            return callback(null, user);
                        });
                    }
                });
            } else {
                callback(new ApiError("Current token wrong or has expired"));
            }
        })
    })
}


module.exports = new ActivateService();
