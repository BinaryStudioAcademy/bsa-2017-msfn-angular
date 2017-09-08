const Repository = require('./generalRepository'),
    Post = require('../schemas/postSchema');

function PostRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Post;
}

PostRepository.prototype = new Repository();

PostRepository.prototype.findById = findById;
PostRepository.prototype.deleteById = deleteById;

function findById(userId, callback) {
    const query = this.model.find({
        $and: [
            {
                userId: userId
            },
            {
                isRemoved: false
            }
        ]
    });
    query.exec(callback);
}

function deleteById(id, userId, callback) {
    const query = this.model.update(
        { $and: [
            {
                createdByUser: userId
            },
            {
                _id: id,
            }
        ]},
        { $set: {
            isRemoved: true
        }}
    );
    query.exec(callback);
}

module.exports = new PostRepository();
