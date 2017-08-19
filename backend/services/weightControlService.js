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
            let newWeightControlList = [...data.weightControl];
            newWeightControlList.push(body);
            userRepository.update(userId, {
                weightControl: newWeightControlList
            }, callback);
        }
    })
}

function deleteItem(data, callback) {
    userRepository.getById(data.user._id, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('User not found'));
        } else {
            let newWeightControlList = [...data.weightControl];
            const index = data.weightControl.findIndex(
                item => item._id === data.body._id
            );
            newWeightControlList.splice(index, 1);

            userRepository.update(data.user._id, {
                weightControl: newWeightControlList
            }, callback);
        }
    })
}

module.exports = new WeightControlService();
