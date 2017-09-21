const ApiError = require('./apiErrorService'),
    tribeRepository = require('../repositories/tribeRepository'),
    postRepository = require('../repositories/postRepository');

function TribeService() {}

TribeService.prototype.createTribe = createTribe;
TribeService.prototype.getAllTribes = getAllTribes;
TribeService.prototype.updateTribeById = updateTribeById;
TribeService.prototype.getTribeById = getTribeById;
TribeService.prototype.getTribesByCreatorId = getTribesByCreatorId;


function createTribe(body, callback) {
    body.isRemoved = false;
    tribeRepository.add(body, function (err, tribeData) {
        if (err) return callback(err);
        if (tribeData === null) {
            callback(null, new ApiError('Cannot create tribe'));
        } else {
            callback(null, tribeData);
        }
    });
}

function getAllTribes(callback) {
    tribeRepository.getAll(function (err, tribeData) {
        if (err) return callback(err);
        if (tribeData === null) {
            callback(null, new ApiError('Cannot find tribes'));
        } else {
            callback(null, tribeData);
        }
    });
}

function updateTribeById(id, body, callback) {
    tribeRepository.update(id, body, callback);
}

function getTribeById(id, callback) {
    tribeRepository.getById(id, function (err, tribeData) {
        if (err) return callback(err);
        if (tribeData === null) {
            callback(null, new ApiError('Cannot delete tribe'));
        } else {
            callback(null, tribeData);
        }
    });
}

function getTribesByCreatorId(creator, callback) {
    tribeRepository.getByCreatorId(creator, function (err, tribeData) {
        if (err) return callback(err);
        if (tribeData === null) {
            callback(null, new ApiError('Cannot find tribes'));
        } else {
            callback(null, tribeData);
        }
    });
}


module.exports = new TribeService();
