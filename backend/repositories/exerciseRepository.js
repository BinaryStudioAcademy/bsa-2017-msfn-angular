const Repository = require('./generalRepository'),
    UserService = require('../services/exerciseService'),
    Exercise = require('../schemas/exerciseSchema');

function ExerciseRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Exercise;
};

ExerciseRepository.prototype = new Repository();
module.exports = new ExerciseRepository();