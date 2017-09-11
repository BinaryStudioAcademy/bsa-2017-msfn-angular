function ChatService() {

}

module.exports = new ChatService();

const ApiError = require('./apiErrorService');
const decryptService = require('./decryptService');
const userRepository = require('../repositories/userRepository');
const chatRepository = require('../repositories/chatsRepository');
const chatMessageRepository = require('../repositories/chatMessageRepository');
const socketService = require('../services/socketService');
const cryptojs = require("crypto-js");

ChatService.prototype.CreateRoom = function(data, callback) {
    const decryptedData = decryptService(data);

    const {senderId, recieverId} = decryptedData;

    chatRepository.add({
        users: [senderId, recieverId],
        room: cryptojs.SHA256(senderId + ' ' + recieverId)
    }, (err, result) => {
        if (err) return callback(err);

        chatRepository.model.populate(result, {path: 'users', select: ['firstName', 'lastName', 'fullName', '_id', 'userPhoto']}, (err, populatedResult) => {
            if (err) return callback(err);

            callback(null, populatedResult);
        })
    });
};

ChatService.prototype.GetRooms = function(data, callback) {
    const decryptedData = decryptService(data);
    const userId = decryptedData.user;

    chatRepository.get({
        filter: {
            isRemoved: false,
            users: {
                $in: [userId]
            }
        },
        populate: [
            {
                path: 'users',
                select: ['firstName', 'lastName', 'fullName', '_id', 'userPhoto']
            }
        ]
    }, (err, result) => {
        if (err) return callback(err);

        callback(null, result);
    })
};

ChatService.prototype.GetMessages = function(data, callback) {
    const decryptedData = decryptService(data);

    const {room, offset, limit} = decryptedData;

    chatMessageRepository.get({
        'filter': {
            room: room,
            isRemoved: false
        },
        'limit': limit,
        'offset': offset,
        'sort': {
            date: -1
        }
    }, (err, result) => {
        if (err) return callback(err);

        const newResult = {
            room: room,
            result: result
        };

        callback(null, newResult);
    });
};

ChatService.prototype.NewMessage = function(data, callback) {
    const decryptedData = decryptService(data);

    chatMessageRepository.add(decryptedData, (err, result) => {
         if (err) return callback(err);

         socketService.BroadcastRoom('new_message:success', result.room, JSON.stringify(result));

         // callback(null, result);
    });
};

ChatService.prototype.CheckUserOnline = function(data, callback) {
    const decryptedData = decryptService(data);
    const userId = decryptedData.user;

    const userSocket = socketService.GetUserById(userId);

    if (!userSocket) {
        return callback(null, {room: decryptedData.room, user: userId, online: false});
    }
    callback(null, {room: decryptedData.room, user: userId, online: true});
};

ChatService.prototype.ReadMessage = function(data, callback) {
    const decryptedData = decryptService(data);
    const {messageId, room} = decryptedData;

    chatMessageRepository.update(messageId, {read: true}, (err, result) => {
        if (err) return callback(err);

        const callbackData = {
            messageId: messageId,
            room: room
        };

        socketService.BroadcastRoom('read_message:success', room, JSON.stringify(callbackData));
    });
};

