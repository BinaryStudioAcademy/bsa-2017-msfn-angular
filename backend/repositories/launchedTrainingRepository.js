const Repository = require('./generalRepository');
LaunchedTraining = require('../schemas/launchedTrainingSchema');

function LaunchedTrainingRepository() {
    Repository.prototype.constructor.call(this);
    this.model = LaunchedTraining;
};

LaunchedTrainingRepository.prototype = new Repository();
LaunchedTrainingRepository.prototype.getLaunchedTrainingsByUserId = getLaunchedTrainingsByUserId;

function getLaunchedTrainingsByUserId(id, callback) {
    const query = this.model.find({
        userID: id
    });
    query.exec(callback);
};

module.exports = new LaunchedTrainingRepository();
