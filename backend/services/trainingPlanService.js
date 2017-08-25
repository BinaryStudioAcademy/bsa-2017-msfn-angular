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
                isRemoved: false,
            },
        };

        if(data){
           params.filter = Object.assign(params.filter, data);
        }
        trainingPlanRepository.get(params, (err, exerciseData) => {
            if (err) return callback(err);
            if (exerciseData === null) {
                callback(null, new ApiError('Not found plan'));
            } else {
                callback(null, exerciseData);
            }
        });
    }

    add(req, callback){
        let data = req.body;
        data.isRemoved = false;
        data.userID = req.session.passport.user;
        delete data._id;
        trainingPlanRepository.add(data, (err, planData) => {
                if (err) return callback(err);
                if (planData === null) {
                    callback(null, new ApiError('Can\'t create plan'));
                } else {
                    callback(null, planData);
                }
            });
    }

    update(id, body, callback) {
        trainingPlanRepository.update(id, body, callback);
    }

    delete(id, callback) {
        trainingPlanRepository.deleteById(id, callback);
    }

}

module.exports = new trainingPlanService();