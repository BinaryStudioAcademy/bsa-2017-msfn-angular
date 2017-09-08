module.exports = (function () {
    const notificationService = require('../../services/notificationService');
    const chatService = require('../../services/chatService');

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
        },
        'get_chat_rooms': (data, callback) => {
            chatService.GetRooms(data, callback);
        },
        'create_room': (data, callback) => {
            chatService.CreateRoom(data, callback);
        },
        'check_user_online': (data, callback) => {
            const socketService = require('../../services/socketService');
            socketService.CheckUserOnline(data, callback);
        }
    };
})();
