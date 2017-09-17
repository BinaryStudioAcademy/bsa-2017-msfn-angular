const Repository = require('./generalRepository'),
        Post = require('../schemas/postSchema');


function PostRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Post;
}

PostRepository.prototype = new Repository();

PostRepository.prototype.getByTribeId = getByTribeId;
PostRepository.prototype.deleteById = deleteById;
PostRepository.prototype.getByCreatorId = getByCreatorId;

function getByTribeId(tribeId, callback) {
    const query = this.model.find({
        $and: [
            {
                tribe : tribeId
            }, {
                isRemoved: false
            }
        ]
    });
    query.exec(callback);
}

function deleteById(id, callback) {
    const query = this.model.update(
        { $and: {
                    _id: id,
                }
        },
        { $set: {
            isRemoved: true
        }}
    );
    query.exec(callback);
}

function getByCreatorId(userId, tribeId, callback) {
    const query = this.model.find({
        $and: [
            {
                tribe : tribeId
            }, {
                author: userId
            }, {
                isRemoved: false
            }
        ]
    });
    query.exec(callback);
}

module.exports = new PostRepository();
