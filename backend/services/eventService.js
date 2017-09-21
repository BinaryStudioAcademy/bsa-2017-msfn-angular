const ApiError = require('./apiErrorService');
const eventRepository = require('../repositories/eventRepository');
const messageRepository = require('../repositories/messageRepository');

function EventService() { }

EventService.prototype.getItemById = getItemById;
EventService.prototype.getAllItems = getAllItems;
EventService.prototype.getItemsByUserId = getItemsByUserId;
EventService.prototype.getApplicants = getApplicants;
EventService.prototype.getItemsByDates = getItemsByDates;
EventService.prototype.getMessages = getMessages;
EventService.prototype.addItem = addItem;
EventService.prototype.applyUser = applyUser;
EventService.prototype.unapplyUser = unapplyUser;
EventService.prototype.deleteItem = deleteItem;

function getItemById(req, callback) {
    eventRepository.getById(req.params.id, (err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
}

function getAllItems(callback) {
    eventRepository.getAll((err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
}

function getItemsByUserId(body, callback) {
    eventRepository.findByUserId(body.params.id, (err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
}

function getItemsByDates(body, callback) {
    const startDate = new Date(parseInt(body.startTimeStamp));
    const endDate = new Date(parseInt(body.endTimeStamp));
    eventRepository.findByDates(startDate, endDate, (err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
}

function getApplicants(category, body, callback) {
    const eventId = body.params.id;
    eventRepository.getApplicants(category, eventId, (err, data) => {
        callback(err, data);
    });
}

function getMessages(body, callback) {
    messageRepository.findByEventId(body.params.id, (err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
}

function addItem(body, callback) {
    if (body.creator && body.title && body.startDate) {
        eventRepository.add(body, (err, data) => {
            if (err) return callback(err);
            if (data === null) {
                callback(null, []);
            } else {
                callback(null, data);
            }
        });
    } else {
        callback(new ApiError('Invalid event data'));
    }
}

function applyUser(eventId, body, callback) {
    eventRepository.getById(eventId, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('Event not found'));
        } else {
            if (data.creator._id.toString() === body.userId) {
                callback(new ApiError('Creator cannot be applied to event'));
            } else {
                eventRepository.applyUser(eventId, body, callback);
            }
        }
    })
}

function unapplyUser(eventId, body, callback) {
    eventRepository.getById(eventId, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('Event not found'));
        } else {
            eventRepository.unapplyUser(eventId, body, callback);
        }
    })
}

function deleteItem(id, userId, callback) {
    eventRepository.deleteById(id, userId, (err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
}

module.exports = new EventService();
