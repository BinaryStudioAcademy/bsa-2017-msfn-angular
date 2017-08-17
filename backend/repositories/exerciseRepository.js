const Repository = require('./generalRepository'),
    Exercise = require('../schemas/exerciseSchema');

function ExerciseRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Exercise;
};

ExerciseRepository.prototype = new Repository();
ExerciseRepository.prototype.getAllExercises = getAllExercises;

function getAllExercises(callback) {
    const query = this.model.find({}).populate('type', 'name')
    query.exec(callback);
};

module.exports = new ExerciseRepository();