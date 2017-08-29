const loadService = require('./loadService');
const exerciseTypeService = require('./../exerciseTypeService');

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
            console.log(formatedTypes);
            for(let i = 0; i< formatedTypes.length; i++){
                const currentType = formatedTypes[i];
                exerciseTypeService.createExerciseType(currentType, (err, data) => {
                    console.log('in' + i);
                });
                console.log('out' + i);
            }
            
            callback(null, formatedTypes);
            
        });
    }

}

module.exports = new exerciseLoadService();