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
    if (body.user && body.body) {
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

function updateItem(id, userId, body, callback) {
    if (body.user && body.body) {
        messageRepository.updateById(id, userId, body.body, (err, data) => {
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
