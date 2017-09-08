const ApiError = require('./apiErrorService');
const postRepository = require('../repositories/postRepository');

function PostService() { }

PostService.prototype.getItemsByUserId = getItemsByUserId;
PostService.prototype.addItem = addItem;
PostService.prototype.updateItem = updateItem;
PostService.prototype.deleteItem = deleteItem;

function getItemsByUserId(userId, callback) {
    postRepository.findById(userId, (err, data) => {
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
        postRepository.add(body, (err, data) => {
            if (err) return callback(err);
            if (data === null) {
                callback(null, []);
            } else {
                callback(null, data);
            }
        });
    } else {
        callback(new ApiError('Invalid post data'));
    }
}

function updateItem(id, body, callback) {
    if (body.userId && body.body) {
        postRepository.update(id, body, (err, data) => {
            if (err) return callback(err);
            if (data === null) {
                callback(null, []);
            } else {
                callback(null, data);
            }
        });
    } else {
        callback(new ApiError('Invalid post data'));
    }
}

function deleteItem(id, userId, callback) {
    postRepository.deleteById(id, userId, (err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
}

module.exports = new PostService();
