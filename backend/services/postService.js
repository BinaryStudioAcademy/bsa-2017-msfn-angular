const ApiError = require('./apiErrorService');
const postRepository = require('../repositories/postRepository');


function PostService() {}

PostService.prototype.createPost = createPost;
PostService.prototype.updatePostById = updatePostById;
PostService.prototype.getPostsByTribeId = getPostsByTribeId;
PostService.prototype.getPostsByCreatorAndTribe = getPostsByCreatorAndTribe;
PostService.prototype.addComment = addComment;

function createPost(body, callback) {
    postRepository.add(body, function (err, postData) {
        if (err) return callback(err);
        if (postData === null) {
            callback(null, new ApiError('Cannot create post'));
        } else {
            callback(null, postData);
        }
    });
}

function getPostsByTribeId(tribeId, callback) {
    postRepository.getByTribeId(tribeId, function (err, postData) {
        if (err) return callback(err);
        if (postData === null) {
            callback(null, new ApiError('Cannot find posts'));
        } else {
            callback(null, postData);
        }
    });
}

function getPostsByCreatorAndTribe(userId, tribeId, callback) {
    postRepository.getByCreatorId(userId, tribeId, function (err, postData) {
        if (err) return callback(err);
        if (postData === null) {
            callback(null, new ApiError('Cannot find posts'));
        } else {
            callback(null, postData);
        }
    });
}

function updatePostById(id, body, callback) {
    postRepository.update(id, body, callback);
}

function addComment(id, tribe, body, callback) {
    postRepository.addComment(id, tribe, body, (err, data) => {
        if (err) {
            return err;
        }
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    })
}
module.exports = new PostService();
