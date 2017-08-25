const Repository = require('./generalRepository'),
    GoalType = require('../schemas/goalTypeSchema');

function GoalTypeRepository() {
    Repository.prototype.constructor.call(this);
    this.model = GoalType;
}

GoalTypeRepository.prototype = new Repository();

GoalTypeRepository.prototype.findByName = findByName;
GoalTypeRepository.prototype.deleteByName = deleteByName;

function findByName(name, callback) {
    const query = this.model.findOne({
        name: name
    });
    query.exec(callback);
};

function deleteByName(name, callback) {
    const query = this.model.remove({
        name: name
    });
    query.exec(callback);
};

module.exports = new GoalTypeRepository();
