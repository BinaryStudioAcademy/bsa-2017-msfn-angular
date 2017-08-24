const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');
const trainingPlanRepository = require('../repositories/trainingPlanRepository');
const mongoose = require('mongoose');
const objID = mongoose.Types;

class trainingPlanService {

    constructor() { }

    get(data, callback){
        const params = {
            filter: {
                removed: false,
                userID: objID.ObjectId(data.session.passport.user)
            },
        };

        if(data){
           params.filter = Object.assign(params.filter, data);
        }

        trainingPlanRepository.get(params, (err, exerciseData) => {
            if (err) return callback(err);
            if (exerciseData === null) {
                callback(null, new ApiError('Not found exersises'));
            } else {
                callback(null, exerciseData);
            }
        });
    }

    add(data, callback){
        data.isRemoved = false
        console.log(data);
        console.log('-------------------------');
        trainingPlanRepository.add(data, (err, planData) => {
                if (err) return callback(err);
                if (planData === null) {
                    callback(null, new ApiError('Can\'t create plan'));
                } else {
                    callback(null, planData);
                }
            });
    }

    update(){

    }

    delete(){

    }
}

module.exports = new trainingPlanService();