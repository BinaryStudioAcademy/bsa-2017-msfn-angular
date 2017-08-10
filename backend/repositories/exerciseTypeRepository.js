const Repository = require('./generalRepository'),
    UserService = require('../services/exerciseTypeService'),
    ExerciseType = require('../schemas/exerciseTypeSchema');

function ExerciseTypeRepository() {
    Repository.prototype.constructor.call(this);
    this.model = ExerciseType;
}

ExerciseTypeRepository.prototype = new Repository();

ExerciseTypeRepository.prototype.findByCode = findByCode;
ExerciseTypeRepository.prototype.deleteAll = deleteAll;
ExerciseTypeRepository.prototype.deleteByCode = deleteByCode;
ExerciseTypeRepository.prototype.updateByCode = updateByCode;

function findByCode(code, callback) {
    const query = this.model.findOne({
        id: id
    });
    query.exec(callback);
};

function deleteByCode(code, callback) {
    const query = this.model.remove({
        code: code
    });
    query.exec(callback);
};

function deleteAll(callback) {
    const query = this.model.remove({});
    query.exec(callback);
}

function updateByCode(code, body, callback) {
    const query = this.model.update({
        code: code
    }, body);
    query.exec(callback);
};

module.exports = new ExerciseTypeRepository();
