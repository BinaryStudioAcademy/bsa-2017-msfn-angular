const Repository = require('./generalRepository'),
    Message = require('../schemas/messageSchema');

function MessageRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Message;
}

MessageRepository.prototype = new Repository();

MessageRepository.prototype.findByUserId = findByUserId;
MessageRepository.prototype.deleteById = deleteById;

function findByUserId(userId, callback) {
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
                userId: userId
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

module.exports = new MessageRepository();
