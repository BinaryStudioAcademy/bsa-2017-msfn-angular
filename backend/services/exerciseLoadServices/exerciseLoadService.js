const loadService = require('./loadService');
const exerciseTypeService = require('./../exerciseTypeService');
const exerciseService = require('./../exerciseService');
const async = require('async');
const parallel = require('async/parallel');

class exerciseLoadService {

    constructor() {}

    getFormatedData(data, callback) {
        let exercisesList = [];
        this.getTypesExtId((err, typesId) => {
            if(typesId.length === 0){
                return callback('import exercises types first. /api/load/types', '');
            }
            for (let i = 0; i < data.length; i++) {
                const currentExercise = data[i];                
                const exercise = {
                    name: currentExercise.name,
                    type: typesId[currentExercise.category],
                    externalId: currentExercise.id,
                    measure: '',
                    description: currentExercise.description,
                    // image: String
                };
                exercisesList.push(exercise);
            }
            callback(null, exercisesList);
        });
    }

    createAllExercises(callback) {
        loadService.getAll('exercises', (err, data) => {
            this.getFormatedData(data, (err, formatedData) => {
                let funcArray = [];
                for (let i = 0; i < formatedData.length; i++) {
                    const currentExercise = formatedData[i];
                    const addFunc = (callback) => {
                        exerciseService.createExercise(currentExercise, callback);
                    }
                    funcArray.push(addFunc);
                }
                async.parallel(funcArray,
                    (err, results) => {
                        callback(err, {status: `Created ${results.length} exercises`});
                    });
            });
            
        });
    }

    getTypesExtId(callback) {
        exerciseTypeService.getAllExerciseTypes((err, data) => {
            if (err) return false;
            let resultObj = {};
            for (let i = 0; i < data.length; i++) {
                const currentType = data[i];
                if (currentType.externalId)
                    resultObj[currentType.externalId] = currentType._id;
            }
            callback(null, resultObj);
        });
    }
}

module.exports = new exerciseLoadService();
