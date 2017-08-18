const userRepository = require('../repositories/userRepository');
const ApiError = require('./apiErrorService');

function CoachService() {

}

CoachService.prototype.apply = apply;

function apply(id, callback) {
    userRepository.getById(id, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('User not found'));
        } else {
            callback(null, data)
            setTimeout(() => {
                // here must be a business logic function of adding coach permission
                userRepository.update(id, {isCoach: true}, (err, data) => {})
            }, 10000);
        }
    })
}

module.exports = new CoachService();
