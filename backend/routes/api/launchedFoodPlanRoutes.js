const
    apiResponse = require('express-api-response'),
    launchedFoodPlanService = require('../../services/launchedFoodPlanService'),
    baseUrl = '/api/launchedfoodplan';

module.exports = function (app) {

    app.post(baseUrl, function (req, res, next) {
        launchedFoodPlanService.createLaunchedFoodPlan(req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl, function (req, res, next) {
        launchedFoodPlanService.updateLaunchedFoodPlan(req.body._id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl, function (req, res, next) {
        launchedFoodPlanService.deleteLaunchedFoodPlan(req.body._id, (err, data) => {
            res.err = err;
            res.data = data;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/current', function (req, res, next) {
        launchedFoodPlanService.getCurrentLaunchedFoodPlan(req.session.passport.user, (err, data) => {
            if (data instanceof Array && !data.length) {
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/:id', function (req, res, next) {
        launchedFoodPlanService.getLaunchedFoodPlan({_id: req.params.id}, (err, data) => {
            if (data instanceof Array && !data.length) {
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/user/:id', function (req, res, next) {
        launchedFoodPlanService.getLaunchedFoodPlanByUserId(req.params.id, (err, data) => {
            if (data instanceof Array && !data.length) {
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
