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
EventRepository.prototype.getApplicants = getApplicants;
EventRepository.prototype.applyUser = applyUser;
EventRepository.prototype.unapplyUser = unapplyUser;
EventRepository.prototype.deleteById = deleteById;

function getById(id, callback) {
    const query = this.model.findOne({
        _id: id
    })
        .populate({
            path: 'creator',
            select: ['firstName', 'lastName', 'fullName', 'userPhoto']
        })
        .populate({
            path: 'participants',
            select: ['firstName', 'lastName', 'fullName', 'userPhoto']
        })
        .populate({
            path: 'followers',
            select: ['firstName', 'lastName', 'fullName', 'userPhoto']
        });
    query.exec(callback);
}

function getAll(callback) {
    const query = this.model.find({})
        .populate({
            path: 'creator',
            select: ['firstName', 'lastName', 'fullName', 'userPhoto']
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
            path: 'creator',
            select: ['firstName', 'lastName', 'fullName', 'userPhoto']
        })
        .populate({
            path: 'message',
            populate: {
                path: 'user',
                select: ['firstName', 'lastName', 'fullName', 'userPhoto']
            }
        });
    query.exec(callback);
}

function findByDates(startDate, endDate, callback) {
    const query = this.model.find({
        $and: [
            {
                startDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            },
            {
                isRemoved: false
            }
        ]
    })
        .populate({
            path: 'creator',
            select: ['firstName', 'lastName', 'fullName', 'userPhoto']
        });
    query.exec(callback);
}

function getApplicants(category, id, callback) {
    const query = this.model.find({
        _id: id
    }, {
        [category]: 1
    })
        .populate({
            path: category,
            select: ['firstName', 'lastName', 'fullName', 'userPhoto']
        });
    query.exec(callback);
}

function applyUser(id, body, callback) {
    const query = this.model.update(
        {
            _id: id
        },
        { $addToSet: {
            [body.fieldName]: body.userId
        }}
    );
    query.exec(callback);
}

function unapplyUser(id, body, callback) {
    const query = this.model.update(
        {
            _id: id
        },
        { $pull: {
            [body.fieldName]: body.userId
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

module.exports = new EventRepository();
