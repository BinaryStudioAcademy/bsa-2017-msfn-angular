const ApiError = require('./apiErrorService');
const eventRepository = require('../repositories/eventRepository');

function EventService() { }

EventService.prototype.getItemsByUserId = getItemsByUserId;
EventService.prototype.getItemsByDates = getItemsByDates;
EventService.prototype.addItem = addItem;
EventService.prototype.updateByOther = updateByOther;
EventService.prototype.deleteItem = deleteItem;

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
    eventRepository.findByDates(body, (err, data) => {
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

function updateByOther(id, body, callback) {
    eventRepository.updateByOther(id, body, (err, data) => {
        if (err) return callback(err);
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    });
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
