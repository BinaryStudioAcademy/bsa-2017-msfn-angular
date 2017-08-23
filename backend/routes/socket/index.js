const notificationService = require('../../services/notificationService');
const socketService = require('../../services/socketService');

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
    'join_room': (json, callback) => {
        socketService.JoinRoom(json, callback);
    }
};
