const ApiError = require('./apiErrorService');
const exerciseRepository = require('../repositories/exerciseRepository');

function ExerciseService() {}

ExerciseService.prototype.createExercise = createExercise;
ExerciseService.prototype.getAllExercises = getAllExercises;
ExerciseService.prototype.upadeteExerciseById = upadeteExerciseById;deleteExerciseById
ExerciseService.prototype.deleteExerciseById = deleteExerciseById;
ExerciseService.prototype.getExerciseById = getExerciseById;

function createExercise(body, callback) {

    data = {
        name: body.name,
        typeId: body.typeId,
        description: body.description,
        isRemoved: false,
        sportsId: body.sportsId
    }

    exerciseRepository.add(data, (err, exerciseData) => {

        if (err) return callback(err);
        if (exerciseData === null) {
            callback(null, new ApiError('Can\'t create exersise'));
        } else {
            callback(null, exerciseData);
        }
    });
}

function getAllExercises(callback) {
    exerciseRepository.getAll((err, exerciseData) => {
        if (err) return callback(err);
        if (exerciseData === null) {
            callback(null, new ApiError('Not found exersises'));
        } else {
            callback(null, exerciseData);
        }
    });
}

function getExerciseById(id, callback) {
    console.log(2)
    exerciseRepository.getById(id, (err, exerciseData) => {
        console.log(3)
        if (err) return callback(err);
        if (exerciseData === null) {
            callback(null, new ApiError('Not found exersise'));
        } else {
            callback(null, exerciseData);
        }
    });
}

function upadeteExerciseById(id, body, callback) {
    exerciseRepository.update(id, body, callback);
}

function deleteExerciseById(id, callback) {
    exerciseRepository.deleteById(id, callback);
}
module.exports = new ExerciseService();
