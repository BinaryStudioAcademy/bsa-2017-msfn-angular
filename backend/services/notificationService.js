const notificationRepository = require('../repositories/notificationRepository');
const ApiError = require('./apiErrorService');

function NotificationService() {}

NotificationService.prototype.AddNotification = function(json, callback) {
    let data;
    if (typeof json === 'string') {
        try {
            data = JSON.parse(json);
        } catch (err) {
            return callback(err);
        }
    } else {
        data = json;
    }
    notificationRepository.add(data, (err, result) => {
        if (err) return callback(err);
        callback(err, result);
    });
};

NotificationService.prototype.ReadNotification = function(json, callback) {
    let data;
    if (typeof json === 'string') {
        try {
            data = JSON.parse(json);
        } catch (err) {
            return callback(err);
        }
    } else {
        data = json;
    }
    let id, userId;
    ({id, userId} = data);
    notificationRepository.getById(id, (err, result) => {
        if (err) return callback(err);
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
    if (typeof json === 'string') {
        try {
            data = JSON.parse(json);
        } catch (err) {
            return callback(err);
        }
    } else {
        data = json;
    }
    let userId;
    ({userId} = data);
    if (!userId) return callback(new ApiError('No user specified'));

    notificationRepository.get({
        filter: {
            userId: userId,
            isRemoved: false
    //        read: false
        }
    }, callback);
};

module.exports = new NotificationService();
