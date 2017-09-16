const Repository = require('./generalRepository'),
    Event = require('../schemas/eventSchema');

function EventRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Event;
}

EventRepository.prototype = new Repository();

EventRepository.prototype.getById = getById;
EventRepository.prototype.getAll = getAll;
EventRepository.prototype.findByUserId = findByUserId;
EventRepository.prototype.findByDates = findByDates;
EventRepository.prototype.getParticipants = getParticipants;
EventRepository.prototype.getFollowers = getFollowers;
EventRepository.prototype.applyUser = applyUser;
EventRepository.prototype.deleteById = deleteById;

function getById(id, callback) {
    console.log('REPO', id);
    const query = this.model.findOne({
        _id: id
    })
        .populate({
            path: 'creator',
            select: [
                'firstName',
                'lastName',
                'fullName',
                'userPhoto',
            ]
        });
    query.exec(callback);
}

function getAll(callback) {
    const query = this.model.find({})
        .populate({
            path: 'creator',
            select: [
                'firstName',
                'lastName',
                'fullName',
                'userPhoto',
            ]
        });
    query.exec(callback);
}

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
        })
        .populate({
            path: 'message',
            populate: {
                path: 'user',
                select: [
                    'firstName',
                    'lastName',
                    'fullName',
                    'userPhoto',
                ]
            }
        });
    query.exec(callback);
}

function findByDates(startDate, endDate, callback) {
    const query = this.model.find({
        $and: [
            {
                startDate: {
                    $gt: startDate,
                    $lt: endDate
                }
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
        })
        .populate({
            path: 'message',
            populate: {
                path: 'user',
                select: [
                    'firstName',
                    'lastName',
                    'fullName',
                    'userPhoto',
                ]
            }
        });
    query.exec(callback);
}

function getParticipants(id, callback) {
    console.log('GET PART', id);
    const query = this.model.find({
        _id: id
    }, {
        participants: 1
    })
        .populate({
            path: 'participants',
            select: [
                'firstName',
                'lastName',
                'fullName',
                'userPhoto',
            ]
        });
    query.exec(callback);
}

function getFollowers(id, callback) {
    const query = this.model.find({
        _id: id
    }, {
        followers: 1
    })
        .populate({
            path: 'followers',
            select: [
                'firstName',
                'lastName',
                'fullName',
                'userPhoto',
            ]
        });
    query.exec(callback);
}

function applyUser(id, body, callback) {
    console.log('ADD PART', id, body);
    const fieldName = body.fieldName;
    const query = this.model.update(id, {
        $push: {[fieldName]: body.userId}
    });
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

module.exports = new EventRepository();
