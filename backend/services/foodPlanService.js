const ApiError = require('./apiErrorService');
const userService = require('./userService');
const foodPlanRepository = require('../repositories/foodPlanRepository');
const mongoose = require('mongoose');

class foodPlanService {

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
        foodPlanRepository.get(params, (err, foodPlan) => {
            if (err) return callback(err);
            if (foodPlan === null) {
                callback(null, new ApiError('Not found plan'));
            } else {
                callback(null, foodPlan);
            }
        });
    }

    add(req, callback){
        let data = req;
        data.isRemoved = false;
        delete data._id;
        foodPlanRepository.add(data, (err, foodPlan) => {
                if (err) return callback(err);
                if (foodPlan === null) {
                    callback(null, new ApiError('Can\'t create plan'));
                } else {
                    callback(null, foodPlan);
                }
            });
    }

    update(id, body, callback) {
        foodPlanRepository.update(id, body, callback);
    }

    delete(id, callback) {
        foodPlanRepository.deleteById(id, callback);
    }

}

module.exports = new foodPlanService();
