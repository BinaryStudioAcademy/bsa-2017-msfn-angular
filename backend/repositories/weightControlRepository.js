const Repository = require('./generalRepository'),
    WeightControl = require('../schemas/weightControlSchema');

function WeightControlRepository() {
    Repository.prototype.constructor.call(this);
    this.model = WeightControl;
}

WeightControlRepository.prototype = new Repository();
WeightControlRepository.prototype.deleteAll = deleteAll;

function deleteAll(callback) {
    const query = this.model.remove({});
    query.exec(callback);
}

module.exports = new WeightControlRepository();
