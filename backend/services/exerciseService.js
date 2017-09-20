const ApiError = require('./apiErrorService');
const exerciseRepository = require('../repositories/exerciseRepository');
const exerciseTypeRepository = require('../repositories/exerciseTypeRepository');

function ExerciseService() {}

ExerciseService.prototype.createExercise = createExercise;
ExerciseService.prototype.getAllExercises = getAllExercises;
ExerciseService.prototype.getExercisesByType = getExercisesByType;
ExerciseService.prototype.upadeteExerciseById = upadeteExerciseById;
ExerciseService.prototype.deleteExerciseById = deleteExerciseById;
ExerciseService.prototype.getExerciseById = getExerciseById;
ExerciseService.prototype.getExercisesBySport = getExercisesBySport;

function createExercise(body, callback) {

    body.isRemoved = false;

    exerciseRepository.add(body, (err, exerciseData) => {
        if (err) return callback(err);
        if (exerciseData === null) {
            callback(null, new ApiError('Can\'t create exersise'));
        } else {
            callback(null, exerciseData);
        }
    });
}

function getAllExercises(callback) {
    exerciseRepository.getAllExercises((err, exerciseData) => {
        if (err) return callback(err);
        if (exerciseData === null) {
            callback(null, new ApiError('Not found exersises'));
        } else {
            callback(null, exerciseData);
        }
    });
}

function getExercisesByType(category, callback){
    const params = {
        filter: {
            category: category
        },
    };
    exerciseRepository.get(params, (err, exerciseData) => {
        if (err) return callback(err);
        if (exerciseData === null) {
            callback(null, new ApiError('Not found exersises'));
        } else {
            callback(null, exerciseData);
        }
    });
}

function getExercisesBySport(id, callback){
    const params = {
        filter: {
            sports: id
        },
    };
    exerciseRepository.get(params, (err, exerciseData) => {
        if (err) return callback(err);
        if (exerciseData === null) {
            callback(null, new ApiError('Not found exersises'));
        } else {
            callback(null, exerciseData);
        }
    });
}

function getExerciseById(id, callback) {
    exerciseRepository.getById(id, (err, exerciseData) => {
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
