const ApiError = require('./apiErrorService');
const exerciseTypeRepository = require('../repositories/exerciseTypeRepository');

function ExerciseTypeService() {}

ExerciseTypeService.prototype.createExerciseType = createExerciseType; // used funcs
ExerciseTypeService.prototype.getAllExerciseTypes = getAllExerciseTypes;
ExerciseTypeService.prototype.updateExerciseTypeById = updateExerciseTypeById;
ExerciseTypeService.prototype.deleteExerciseTypeById = deleteExerciseTypeById;
ExerciseTypeService.prototype.deleteAllExerciseTypes = deleteAllExerciseTypes;



function createExerciseType(name, callback) {

    exerciseTypeRepository.getAll((err, exerciseTypeData) => {
        if (err) return callback(err);

        let data = {
            name: name,
            isRemoved: false
        };


        exerciseTypeRepository.add(data, (err, exerciseTypeData) => {

            if (err) return callback(err);
            if (exerciseTypeData === null) {
                callback(null, []);
            } else {
                callback(null, exerciseTypeData);
            }
        });
    });
}


function updateExerciseTypeById(id, body, callback) {
    exerciseTypeRepository.updateById(id, body, (err, exerciseTypeData)=>{

        if (err) return callback(err);
        if (exerciseTypeData === null) {
            callback(null, []);
        } else {
            callback(null, exerciseTypeData);
        }
    });
}

function deleteExerciseTypeById(id, callback) {
    exerciseTypeRepository.deleteById(id, (err, exerciseTypeData)=>{

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
