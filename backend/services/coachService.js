const testimonialRepository = require('../repositories/testimonialRepository'),
    userRepository = require('../repositories/userRepository'),
    ApiError = require('./apiErrorService'),
    notificationService = require('../services/notificationService'),
    socketService = require('../services/socketService');

function CoachService() { }

CoachService.prototype.apply = apply;
CoachService.prototype.getTestimonialsByCoachId = getTestimonialsByCoachId;
CoachService.prototype.addTestimonial = addTestimonial;
CoachService.prototype.updateTestimonial = updateTestimonial;
CoachService.prototype.deleteTestimonial = deleteTestimonial;

function apply(id, callback) {
    userRepository.getById(id, (err, user) => {
        if (err) return callback(err);

        if (user === null){
            callback(new ApiError('User not found'));
        } else {
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
                    callback(null, {requested: true});
                });
            });
        }
    })
}

function getTestimonialsByCoachId(body, callback) {
    testimonialRepository.findByCoachId(body.params.id, (err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
}

function addTestimonial(body, callback) {
    if (body.user && body.coach && body.body) {
        testimonialRepository.add(body, (err, data) => {
            if (err) return callback(err);
            if (data === null) {
                callback(null, []);
            } else {
                callback(null, data);
            }
        });
    } else {
        callback(new ApiError('Invalid testimonial data'));
    }
}

function updateTestimonial(id, userId, body, callback) {
    if (body.user && body.body) {
        testimonialRepository.updateById(id, userId, body, (err, data) => {
            if (err) return callback(err);
            if (data === null) {
                callback(null, []);
            } else {
                callback(null, data);
            }
        });
    } else {
        callback(new ApiError('Invalid testimonial data'));
    }
}

function deleteTestimonial(id, userId, callback) {
    testimonialRepository.deleteById(id, userId, (err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
}

module.exports = new CoachService();
