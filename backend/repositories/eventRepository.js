const Repository = require('./generalRepository'),
    Event = require('../schemas/eventSchema');

function EventRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Event;
}

EventRepository.prototype = new Repository();

EventRepository.prototype.getAll = getAll;
EventRepository.prototype.findByUserId = findByUserId;
EventRepository.prototype.findByDates = findByDates;
EventRepository.prototype.updateByOther = updateByOther;
EventRepository.prototype.deleteById = deleteById;

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

function updateByOther(id, body, callback) {
    const query = this.model.update(id, {
        $push: body
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
