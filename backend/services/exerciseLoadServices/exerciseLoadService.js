const loadService = require('./loadService');

class exerciseLoadService {

    constructor() { }


    getFormatedData(data) {
        let exercisesList = [];
        
        console.log(resultsArray.length);
        for (let i = 0; i < resultsArray.length; i++) {
            const exercise = {
                name: resultsArray[i].name,
                // type: {
                //     type: Schema.Types.ObjectId,
                //     ref: 'ExerciseType'
                // },
                externalId: resultsArray[i].id,
                isRemoved: false,
                // sportsId:Array,
                description: resultsArray[i].description,
                image: String
            };
        }
        return true;
    }

    getAllExercises(callback) {
        loadService.getAll('exercises', (err, data) => {
            console.log(data);
        });
    }

}

module.exports = new exerciseLoadService();