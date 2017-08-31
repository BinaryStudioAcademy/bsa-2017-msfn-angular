const ApiError = require('./apiErrorService');
const exerciseTypeRepository = require('../repositories/exerciseTypeRepository');

function ExerciseTypeService() { }

ExerciseTypeService.prototype.createExerciseType = createExerciseType; // used funcs
ExerciseTypeService.prototype.getAllExerciseTypes = getAllExerciseTypes;
ExerciseTypeService.prototype.updateExerciseTypeByCode = updateExerciseTypeByCode;
ExerciseTypeService.prototype.deleteExerciseTypeByCode = deleteExerciseTypeByCode;
ExerciseTypeService.prototype.deleteAllExerciseTypes = deleteAllExerciseTypes;



function createExerciseType(data, callback) {
    data.isRemoved = false;

    exerciseTypeRepository.add(data, (err, exerciseTypeData) => {
        if (err) return callback(err);
        if (exerciseTypeData === null) {
            callback(null, []);
        } else {
            console.log(exerciseTypeData);
            callback(null, exerciseTypeData);
        }
    });
}


function updateExerciseTypeByCode(code, body, callback) {
    exerciseTypeRepository.updateByCode(code, body, (err, exerciseTypeData) => {

        if (err) return callback(err);
        if (exerciseTypeData === null) {
            callback(null, []);
        } else {
            callback(null, exerciseTypeData);
        }
    });
}

function deleteExerciseTypeByCode(code, callback) {
    exerciseTypeRepository.deleteByCode(code, (err, exerciseTypeData) => {

        if (err) return callback(err);
        if (exerciseTypeData === null) {
            callback(null, []);
        } else {
            callback(null, exerciseTypeData);
        }
    });
}


function deleteAllExerciseTypes(callback) {
    exerciseTypeRepository.deleteAll((err, exerciseTypeData) => {

        if (err) return callback(err);
        if (exerciseTypeData === null) {
            callback(null, []);
        } else {
            callback(null, exerciseTypeData);
        }
    });
}

function getAllExerciseTypes(callback) {
    exerciseTypeRepository.getAll((err, exerciseTypeData) => {
        if (err) return callback(err);
        if (exerciseTypeData === null) {
            callback(null, []);
        } else {
            callback(null, exerciseTypeData);
        }
    });
}


module.exports = new ExerciseTypeService();
