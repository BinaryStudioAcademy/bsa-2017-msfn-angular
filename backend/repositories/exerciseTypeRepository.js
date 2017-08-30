const Repository = require('./generalRepository'),
    ExerciseType = require('../schemas/exerciseTypeSchema');

function ExerciseTypeRepository() {
    Repository.prototype.constructor.call(this);
    this.model = ExerciseType;
}

ExerciseTypeRepository.prototype = new Repository();

ExerciseTypeRepository.prototype.findById = findById;
ExerciseTypeRepository.prototype.deleteAll = deleteAll;
ExerciseTypeRepository.prototype.deleteById = deleteById;
ExerciseTypeRepository.prototype.updateById = updateById;

function findById(id, callback) {
    const query = this.model.findOne({
        _id: id
    });
    query.exec(callback);
};

function deleteById(id, callback) {
    const query = this.model.remove({
        _id: id
    });
    query.exec(callback);
};

function deleteAll(callback) {
    const query = this.model.remove({});
    query.exec(callback);
}

function updateById(id, body, callback) {
    const query = this.model.update({
        _id: id
    }, body);
    query.exec(callback);
};

module.exports = new ExerciseTypeRepository();
