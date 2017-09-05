const loadService = require('./loadService');
const exerciseService = require('./../exerciseService');
const async = require('async');
const parallel = require('async/parallel');
const download = require('image-downloader');
const fs = require('fs');

class exerciseImagesLoadService {

    constructor() {
        this.imagesDir = './resources/exercise-image/loaded/';
    }

    getFormatedData(data, callback) {
        this.getExercisesExtId((err, exercisesId) => {
            
            if (exercisesId.length === 0) {
                return callback('import exercises first. /api/load/exercises', '');
            }
            let exercisesList = {};
            let funcArray = [];
            for (let i = 0; i < data.length; i++) {
                const currentImg = data[i];
                if (exercisesId[currentImg.exercise]) {
                    if (!exercisesList[currentImg.exercise]) {
                        exercisesList[currentImg.exercise] = {
                            id: exercisesId[currentImg.exercise],
                            body: {
                                image: []
                            }
                        };
                    }
            
                    const saveFunc = (callback) => {
                        this.saveImage(currentImg.exercise, currentImg.image, callback);
                    }
                    funcArray.push(saveFunc);
                    
                }
            }
            async.parallel(funcArray,
            (err, results) => {
                for (let i = 0; i < results.length; i++) {
                    const currentImg = results[i];
                    exercisesList[currentImg.id].body.image.push(currentImg.file);
                }
                callback(null, exercisesList);
                
            });
        });
    }

    addImages(callback) {
        loadService.getAll('exerciseimage', (err, data) => {
            
            if (!fs.existsSync(this.imagesDir)){
                fs.mkdirSync(this.imagesDir);
            }

            this.getFormatedData(data, (err, formatedData) => {
                    let funcArray = [];
                    for (let id in formatedData) {
                        const currentExercise = formatedData[id];
                        const updFunc = (callback) => {
                            exerciseService.upadeteExerciseById(currentExercise.id, currentExercise.body, callback);
                        }
                        funcArray.push(updFunc);
                    }
                    async.parallel(funcArray,
                        (err, results) => {
                            callback(err, {status: `Updated ${results.length} exercises`});
                    });
            });

        });

    }

    getExercisesExtId(callback) {
        exerciseService.getAllExercises((err, data) => {
            if (err) return false;
            let resultObj = {};
            for (let i = 0; i < data.length; i++) {
                const currentExercise = data[i];
                if (currentExercise.externalId)
                    resultObj[currentExercise.externalId] = currentExercise._id;
            }
            callback(null, resultObj);
        });
    }

    saveImage(id, url, callback){
        const options = {
            url: url,
            dest: this.imagesDir       
          };
           
          download.image(options)
            .then(({ filename, image }) => {
                callback(null, {id: id, file: filename});
            }).catch((err) => {
              throw err;
            });
    }
}

module.exports = new exerciseImagesLoadService();