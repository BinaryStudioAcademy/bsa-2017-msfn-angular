const Repository = require('./generalRepository'),
    Exercise = require('../schemas/exerciseSchema');

function ExerciseRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Exercise;
}

ExerciseRepository.prototype = new Repository();
ExerciseRepository.prototype.getAllExercises = getAllExercises;
ExerciseRepository.prototype.pushExercisesSport = pushExercisesSport;
ExerciseRepository.prototype.removeSportFromAllExercises = removeSportFromAllExercises;

function getAllExercises(callback) {
    const query = this.model.find({}).populate('category', 'name');
    query.exec(callback);
}

function pushExercisesSport(id, data, callback) {
    const query = this.model.update(
        { '_id': id },
        { $addToSet: { sports: data } }
    );
    query.exec(callback);
}

function removeSportFromAllExercises(data, callback) {
    const query = this.model.update(
        {},
        { $pull: { sports: data._id } },
        { multi: true }
    );
    query.exec(callback);
}

module.exports = new ExerciseRepository();
