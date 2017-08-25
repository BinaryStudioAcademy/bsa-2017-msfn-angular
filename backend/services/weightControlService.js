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
            userRepository.update(userId, {
                $push: {weightControl: {
                    date: body.date,
                    fatPct: body.datPct,
                    boneWeight: body.boneWeight,
                    waterPct: body.waterPct,
                    weight: body.weight
                }}
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
            userRepository.update(data.user._id, {
                $pull: {
                    weightControl: {
                        _id: data.body._id
                    }
                }
            }, callback);
        }
    })
}

module.exports = new WeightControlService();
