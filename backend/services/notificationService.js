const notificationRepository = require('../repositories/notificationRepository');
const ApiError = require('./apiErrorService');

function NotificationService() {}

NotificationService.prototype.AddNotification = function(json, callback) {
    let data;
    try {
        data = JSON.parse(json);
    } catch (err) {
        return callback(err);
    }
    let title, message, user;
    ({title, message, userId} = data);
    notificationRepository.add({
        title: title,
        message: message,
        userId: userId
    }, (err, result) => {
        if (err) return callback(err);
        callback(err, result);
    });
};

NotificationService.prototype.ReadNotification = function(json, callback) {
    let data;
    try {
        data = JSON.parse(json);
    } catch (err) {
        return callback(err);
    }
    let id, userId;
    ({id, userId} = data);
    notificationRepository.getById(id, (err, result) => {
        if (err) return callback(err);
        console.log(result);
        if (!result) return callback(new ApiError('Notification not found'));
        if (result.userId.toString() !== userId) return callback(new ApiError('Wrong user'));
        notificationRepository.update(id, {
            read: true
        }, (err, result) => {
            if (err) return callback(err);
            callback(err, result);
        });
    });
};

NotificationService.prototype.GetNotifications = function(json, callback) {
    let data;
    try {
        data = JSON.parse(json);
    } catch (err) {
        return callback(err);
    }
    let userId;
    ({userId} = data);
    if (!userId) return callback(new ApiError('No user specified'));

    notificationRepository.get({
        filter: {
            userId: userId,
    //        read: false
        }
    }, callback);
};

module.exports = new NotificationService();
