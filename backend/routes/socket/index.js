const notificationService = require('../../services/notificationService');

module.exports = {
    'add_notification': (json, callback) => {
        notificationService.AddNotification(json, callback);
    },
    'read_notification': (json, callback) => {
        notificationService.ReadNotification(json, callback);
    },
    'get_notifications': (json, callback) => {
        notificationService.GetNotifications(json, callback);
    },
};
