const ApiError = require('./apiErrorService');
const launchedTrainingRepository = require('../repositories/launchedTrainingRepository');
const mongoose = require('mongoose')

function LaunchedTrainingService() { }

LaunchedTrainingService.prototype.getLaunchedTrainingsByUserId = getLaunchedTrainingsByUserId;
LaunchedTrainingService.prototype.updateLaunchedTraining = updateLaunchedTraining;
LaunchedTrainingService.prototype.deleteLaunchedTraining = deleteLaunchedTraining;
LaunchedTrainingService.prototype.createLaunchedTraining = createLaunchedTraining;
LaunchedTrainingService.prototype.getLaunchedTraining = getLaunchedTraining;

function getLaunchedTrainingsByUserId(userId, callback) {
    launchedTrainingRepository.getLaunchedTrainingsByUserId(userId, (err, trainingData) => {
        if (err) return callback(err);
        if (trainingData === null) {
            callback(null, new ApiError('Not found exersises'));
        } else {
            callback(null, trainingData);
        }
    });
}

function updateLaunchedTraining(id, body, callback) {
    launchedTrainingRepository.update(id, body, callback);
}

function deleteLaunchedTraining(id, callback) {
    // adding isRemoved: true
    launchedTrainingRepository.deleteById(id, callback);
}

function createLaunchedTraining(body, callback) {
    launchedTrainingRepository.add(body, (err, trainingData) => {
        if (err) return callback(err);
        if (trainingData === null) {
            callback(null, new ApiError('Can\'t create training'));
        } else {
            // Response with just an id of created launchedTraining
            callback(null, trainingData._id);
        }
    });
}

function getLaunchedTraining(data, callback) {
    const params = {
        filter: {
            isRemoved: false,
        },
        populate: 'exercisesList.exercise'
    };
    if (data) {
        params.filter = Object.assign(params.filter, data);
    }
    launchedTrainingRepository.get(params, (err, trainingData) => {
        if (err) return callback(err);
        if (trainingData === null) {
            callback(null, new ApiError('Training not found'));
        } else {
            callback(null, trainingData);
        }
    });
}


module.exports = new LaunchedTrainingService();
