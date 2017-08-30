const
    apiResponse = require('express-api-response'),
    trainingPlanService = require('../../services/trainingPlanService'),
    trainingPlanRepository = require('../../repositories/trainingPlanRepository'),
    ApiError = require('../../services/apiErrorService'),
    baseUrl = '/api/training-plan';

module.exports = function (app) {
    app.get(baseUrl, function (req, res, next) {
        trainingPlanService.get({userID: req.session.passport.user}, function (err, data) {
            if (!data.length) {
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/public/:offset', function (req, res, next) {
        const offset = parseInt(req.params.offset);
        if (isNaN(offset)) {
            res.err = new ApiError('Wrong offset');
            next();
        }
        trainingPlanRepository.get({
            filter: {
                isRemoved: false,
                shared: true
            },
            limit: 1,
            offset: offset
        }, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/:id', function (req, res, next) {
        trainingPlanService.get({_id: req.params.id, userID: req.session.passport.user}, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        const newPlan = req.body;
        newPlan.userID = req.session.passport.user;
        trainingPlanService.add(newPlan, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + '/:id', function (req, res, next) {
        trainingPlanService.update(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + '/:id', function (req, res, next) {
        trainingPlanService.delete(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
