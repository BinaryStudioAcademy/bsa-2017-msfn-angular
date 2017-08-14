const userRepository = require('../repositories/userRepository');
const ApiError = require('./apiErrorService');

function CoachService() {

}

CoachService.prototype.apply = apply;

function apply(id, body, callback) {
    userRepository.getById(id, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('User not found'));
        } else {
            userRepository.update(id, body, callback);
        }
    })
}

module.exports = new CoachService();
