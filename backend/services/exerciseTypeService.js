const ApiError = require('./apiErrorService');
const exerciseTypeRepository = require('../repositories/exerciseTypeRepository');

function ExerciseTypeService() {}

ExerciseTypeService.prototype.createExerciseType = createExerciseType; // used funcs
ExerciseTypeService.prototype.getAllExerciseTypes = getAllExerciseTypes;
ExerciseTypeService.prototype.updateExerciseTypeByCode = updateExerciseTypeByCode;
ExerciseTypeService.prototype.deleteExerciseTypeByCode = deleteExerciseTypeByCode;
ExerciseTypeService.prototype.deleteAllExerciseTypes = deleteAllExerciseTypes;



function createExerciseType(name, callback) {

    exerciseTypeRepository.getAll((err, exerciseTypeData) => {
        if (err) return callback(err);
        let max = 0;
        if (exerciseTypeData instanceof Array && exerciseTypeData.length) {
            max = exerciseTypeData[0].code;

            exerciseTypeData.forEach((elem) => {
                max = Math.max(max, elem.code);
            });

        };

        let data = {
            name: name,
            code: max + 1,
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


function updateExerciseTypeByCode(code, body, callback) {
    exerciseTypeRepository.updateByCode(code, body, (err, exerciseTypeData)=>{

        if (err) return callback(err);
        if (exerciseTypeData === null) {
            callback(null, []);
        } else {
            callback(null, exerciseTypeData);
        }
    });
}

function deleteExerciseTypeByCode(code, callback) {
    exerciseTypeRepository.deleteByCode(code, (err, exerciseTypeData)=>{

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
