const loadService = require('./loadService');
const exerciseTypeService = require('./../exerciseTypeService');
const async = require('async');
const parallel = require('async/parallel');

class exerciseLoadService {

    constructor() { }

    getFormatedData(resultsArray) {
        let types = [];
        for (let i = 0; i < resultsArray.length; i++) {
            const exerciseType = {
                name: resultsArray[i].name,
                externalId: resultsArray[i].id,
            };
            types.push(exerciseType);
        }
        return types;
    }

    createAllTypes(callback) {
        loadService.getAll('exercisecategory', (err, data) => {
            const formatedTypes = this.getFormatedData(data);

            let funcArray = [];
            for (let i = 0; i < formatedTypes.length; i++) {
                const currentType = formatedTypes[i];
                const addFunc = (callback) => {
                    exerciseTypeService.createExerciseType(currentType, callback);
                }
                funcArray.push(addFunc);
            }
            async.parallel(funcArray,
                (err, results) => {
                    callback(err, `Created ${results.length} exercise types `);
                });
        });
    }

}

module.exports = new exerciseLoadService();