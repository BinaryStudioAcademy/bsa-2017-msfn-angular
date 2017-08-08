const Repository = require('./generalRepository'),
    UserService = require('../services/exerciseTypeService'),
    ExerciseType = require('../schemas/exerciseTypeSchema');

function ExerciseTypeRepository() {
    Repository.prototype.constructor.call(this);
    this.model = ExerciseType;
}

ExerciseTypeRepository.prototype = new Repository();

module.exports = new ExerciseTypeRepository();
