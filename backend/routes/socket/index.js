module.exports = (function () {
    const notificationService = require('../../services/notificationService');

    return {
        'add_notification': (json, callback) => {
            notificationService.AddNotification(json, callback);
        },
        'read_notification': (json, callback) => {
            notificationService.ReadNotification(json, callback);
        },
        'get_notifications': (json, callback) => {
            notificationService.GetNotifications(json, callback);
        },
        'join_room': (json, callback) => {
            const socketService = require('../../services/socketService');
            socketService.JoinRoom(json, callback);
        }
    };
})();
