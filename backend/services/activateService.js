const ApiError = require('./apiErrorService');
const emailService = require('./emailService');

function ActivateService() {}

ActivateService.prototype.makeid = makeid;
ActivateService.prototype.checkActivateCode = checkActivateCode;

function makeid() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    for (let i = 0; i < 50; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function checkActivateCode(body, callback) {
    const userRepository = require('../repositories/userRepository');

    userRepository.findById(body.id, (err, user) => {
        if (err) {
            return callback(err);
        }
        user.checkToken(body.activateToken, status => {
            if (status){
                user.activateToken = '';
                userRepository.update(body.id, user, callback);
            } else {
                callback(new ApiError("Wrong token"));
            }
        })
    })
}

module.exports = new ActivateService();
