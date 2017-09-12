const Repository = require('./generalRepository'),
    Message = require('../schemas/messageSchema');

function MessageRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Message;
}

MessageRepository.prototype = new Repository();

MessageRepository.prototype.findByUserId = findByUserId;
MessageRepository.prototype.updateById = updateById;
MessageRepository.prototype.deleteById = deleteById;

function findByUserId(userId, callback) {
    const query = this.model.find({
        $and: [
            {
                user: userId
            },
            {
                isRemoved: false
            }
        ]
    })
        .populate({
            path: 'user',
            select: [
                'firstName',
                'lastName',
                'fullName',
                'userPhoto',
            ]
        });
    query.exec(callback);
}

function updateById(id, userId, body, callback) {
    const query = this.model.update(
        { $and: [
            {
                user: userId
            },
            {
                _id: id,
            }
        ]},
        { $set: {
            body: body
        }}
    );
    query.exec(callback);
}

function deleteById(id, userId, callback) {
    const query = this.model.update(
        { $and: [
            {
                user: userId
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
