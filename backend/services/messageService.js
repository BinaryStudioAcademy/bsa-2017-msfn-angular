const ApiError = require('./apiErrorService');
const messageRepository = require('../repositories/messageRepository');

function MessageService() { }

MessageService.prototype.getItemsByUserId = getItemsByUserId;
MessageService.prototype.addItem = addItem;
MessageService.prototype.updateItem = updateItem;
MessageService.prototype.deleteItem = deleteItem;

function getItemsByUserId(data, callback) {
    messageRepository.findByUserId(data.params.id, (err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
}

function addItem(body, callback) {
    if (body.userId && body.body) {
        messageRepository.add(body, (err, data) => {
            if (err) return callback(err);
            if (data === null) {
                callback(null, []);
            } else {
                callback(null, data);
            }
        });
    } else {
        callback(new ApiError('Invalid message data'));
    }
}

function updateItem(id, body, callback) {
    if (body.userId && body.body) {
        messageRepository.update(id, body, (err, data) => {
            if (err) return callback(err);
            if (data === null) {
                callback(null, []);
            } else {
                callback(null, data);
            }
        });
    } else {
        callback(new ApiError('Invalid message data'));
    }
}

function deleteItem(id, userId, callback) {
    messageRepository.deleteById(id, userId, (err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
}

module.exports = new MessageService();
