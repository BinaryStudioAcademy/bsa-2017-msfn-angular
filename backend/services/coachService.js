const userRepository = require('../repositories/userRepository');
const ApiError = require('./apiErrorService');
const notificationService = require('../services/notificationService');
const socketService = require('../services/socketService');

function CoachService() {

}

CoachService.prototype.apply = apply;

function apply(id, callback) {
    userRepository.getById(id, (err, user) => {
        if (err) return callback(err);

        if (user === null){
            callback(new ApiError('User not found'));
        } else {
            // here must be a business logic function of adding coach permission
            userRepository.update(id, {requestForCoaching: true}, (err, data) => {
                if (err) return callback(err);

                userRepository.get({
                    filter: {
                        isAdmin: true
                    }
                }, (err, admins) => {
                    if (err) return callback(err);

                    admins.forEach(admin => {
                        const newNotification = {
                            userId: admin._id,
                            message: `New coach request from user - ${user.email}`,
                            title: 'New coach request'
                        };
                        notificationService.AddNotification(newNotification, (err, res) => {
                            socketService.BroadcastRoom('new_coach_request', 'admin', JSON.stringify(res));
                        });
                    });
                    callback(null, true);
                });
            });
        }
    })
}

module.exports = new CoachService();
