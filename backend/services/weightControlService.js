const ApiError = require('./apiErrorService');
const weightControlRepository = require('../repositories/weightControlRepository');

function WeightControlService() {}

WeightControlService.prototype.updateItem = updateItem;
WeightControlService.prototype.deleteItem = deleteItem;

function updateItem(id, body, callback) {
    weightControlRepository.getById(id, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('The weight control item wasn\'t found'));
        } else {
            weightControlRepository.update(id, body, callback);
        }
    });
}

function deleteItem(id, callback) {
    weightControlRepository.getById(id, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('The weight control item wasn\'t found'));
        } else {
            weightControlRepository.update(id, callback);
        }
    });
}

module.exports = new WeightControlService();
