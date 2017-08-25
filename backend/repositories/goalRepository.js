const Repository = require('./generalRepository'),
    Goal = require('../schemas/goalSchema');

function GoalRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Goal;
}

GoalRepository.prototype = new Repository();

GoalRepository.prototype.findByName = findByName;
GoalRepository.prototype.deleteById = deleteById;
GoalRepository.prototype.updateById = updateById;

function findByName(name, callback) {
    const query = this.model.findOne({
        name: name
    });
    query.exec(callback);
};

function deleteById(id, callback) {
    console.log('ID: ', id);
    const query = this.model.update({
        _id: id,
    }, {
        $set: {
            isRemoved: true
        }
    });
    query.exec(callback);
};


function updateById(id, body, callback) {
    const query = this.model.update({
        _id: id
    }, body);
    query.exec(callback);
};

module.exports = new GoalRepository();
