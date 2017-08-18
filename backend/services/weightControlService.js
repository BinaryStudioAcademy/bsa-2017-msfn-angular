const ApiError = require('./apiErrorService'),
    userRepository = require('../repositories/userRepository');

function WeightControlService() {}

WeightControlService.prototype.addItem = addItem;
WeightControlService.prototype.deleteItem = deleteItem;

function addItem(userId, body, callback) {
    userRepository.getById(userId, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('User not found'));
        } else {
            data.weightControl.push(body);
            userRepository.update(userId, data, callback);
        }
    })
}

function deleteItem(data, callback) {
    userRepository.getById(data.user._id, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('User not found'));
        } else {
            const index = data.weightControl.findIndex(
                item => item._id === data.body._id
            );
            data.weightControl.splice(index, 1);

            userRepository.update(data.user._id, data, callback);
        }
    })
}

module.exports = new WeightControlService();
