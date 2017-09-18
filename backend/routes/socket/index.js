module.exports = (function () {
    const notificationService = require('../../services/notificationService');
    const chatService = require('../../services/chatService');
    const socketService = require('../../services/socketService');
    const fileService = require('../../services/fileService');

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
            socketService.JoinRoom(json, callback);
        },
        'get_chat_rooms': (data, callback) => {
            chatService.GetRooms(data, callback);
        },
        'create_room': (data, callback) => {
            chatService.CreateRoom(data, callback);
        },
        'check_user_online': (data, callback) => {
            chatService.CheckUserOnline(data, callback);
        },
        'get_messages': (data, callback) => {
            chatService.GetMessages(data, callback);
        },
        'new_message': (data, callback) => {
            chatService.NewMessage(data, callback);
        },
        'read_message': (data, callback) => {
            chatService.ReadMessage(data, callback);
        }
    };
})();
