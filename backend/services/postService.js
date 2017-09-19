const ApiError = require('./apiErrorService');
const postRepository = require('../repositories/postRepository');


function PostService() {}

PostService.prototype.createPost = createPost;
PostService.prototype.updatePost = updatePost;
PostService.prototype.getPostsByTribeId = getPostsByTribeId;
PostService.prototype.getPostsByCreatorAndTribe = getPostsByCreatorAndTribe;

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
        if (exerciseData === null) {
            callback(null, new ApiError('Cannot find posts'));
        } else {
            callback(null, postData);
        }
    });
}

function getPostsByCreatorAndTribe(userId, tribeId, callback) {
    postRepository.getByCreatorId(userId, tribeId, function (err, postData) {
        if (err) return callback(err);
        if (exerciseData === null) {
            callback(null, new ApiError('Cannot find posts'));
        } else {
            callback(null, postData);
        }
    });
}

function updatePost() {

}

module.exports = new PostService();
