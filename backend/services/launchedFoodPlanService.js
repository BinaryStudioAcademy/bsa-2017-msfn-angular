const ApiError = require('./apiErrorService');
const launchedFoodPlanRepository = require('../repositories/launchedFoodPlanRepository');
const mongoose = require('mongoose')

function LaunchedFoodPlanService() { }

LaunchedFoodPlanService.prototype.getLaunchedFoodPlanByUserId = getLaunchedFoodPlanByUserId;
LaunchedFoodPlanService.prototype.getCurrentLaunchedFoodPlan = getCurrentLaunchedFoodPlan;
LaunchedFoodPlanService.prototype.updateLaunchedFoodPlan = updateLaunchedFoodPlan;
LaunchedFoodPlanService.prototype.deleteLaunchedFoodPlan = deleteLaunchedFoodPlan;
LaunchedFoodPlanService.prototype.createLaunchedFoodPlan = createLaunchedFoodPlan;
LaunchedFoodPlanService.prototype.getLaunchedFoodPlan = getLaunchedFoodPlan;

function getLaunchedFoodPlanByUserId(userId, callback) {
    launchedFoodPlanRepository.getLaunchedFoodPlanByUserId(userId, (err, foodPlan) => {
        if (err) return callback(err);
        if (foodPlan === null) {
            callback(null, new ApiError('Not found food plan'));
        } else {
            callback(null, foodPlan);
        }
    });
}

function getCurrentLaunchedFoodPlan(userId, callback) {
    launchedFoodPlanRepository.getLaunchedFoodPlanByUserId(userId, (err, foodPlan) => {
        if (err) return callback(err);
        if (foodPlan === null) {
            callback(null, new ApiError('Not found food plan'));
        } else {
            let launchedfoodPlan = new ApiError('Not found food plan');
            foodPlan.some(el => {
                if (el.status === 'launched') {
                    launchedfoodPlan = el;
                    return true;
                }
            })
            callback(null, launchedfoodPlan);
        }
    });
}

function updateLaunchedFoodPlan(id, body, callback) {
    if (body.todayMeals.finished === true) {
        body.todayMeals = {};
    }
    launchedFoodPlanRepository.update(id, body, callback);
}

function deleteLaunchedFoodPlan(id, callback) {
    launchedFoodPlanRepository.deleteById(id, callback);
}

function createLaunchedFoodPlan(body, callback) {
    getLaunchedFoodPlanByUserId(body.userID, (err, res) => {
        if (err) return callback(err);
        if (res === null || res.every(elem => elem.status !== 'launched')) {
            delete body._id
            body.status = 'launched';
            launchedFoodPlanRepository.add(body, (err, foodPlan) => {
                if (err) return callback(err);
                if (foodPlan === null) {
                    callback(null, new ApiError('Can\'t start traking plan'));
                } else {
                    callback(null, foodPlan);
                }
            });
        } else {
            callback(null, new ApiError('Finished preview plan before start new'));
        }
    })
}

function getLaunchedFoodPlan(data, callback) {
    const params = {
        filter: {
            isRemoved: false,
        }
    };
    if (data) {
        params.filter = Object.assign(params.filter, data);
    }
    launchedFoodPlanRepository.get(params, (err, foodPlan) => {
        if (err) return callback(err);
        if (foodPlan === null) {
            callback(null, new ApiError('Food plan not found'));
        } else {
            callback(null, foodPlan);
        }
    });
}

module.exports = new LaunchedFoodPlanService();
