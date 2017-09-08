const
    apiResponse = require('express-api-response'),
    trainingPlanService = require('../../services/trainingPlanService'),
    trainingPlanRepository = require('../../repositories/trainingPlanRepository'),
    ApiError = require('../../services/apiErrorService'),
    decrypt = require('../../services/decryptService'),
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

    app.get(baseUrl + '/user/:id', function (req, res, next) {
        trainingPlanService.get({userID: req.params.id}, function (err, data) {
            if (!data.length) {
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/public/:params', function (req, res, next) {
        const params = decrypt(req.params.params);
        params.filter.isRemoved = false;
        params.filter.shared = true;
        params.populate = 'exercisesList.exercise';
        if (isNaN(params.limit)) {
            params.limit = null;
        }
        if (isNaN(params.offset)) {
            params.offset = null;
        }
        trainingPlanRepository.get(
            params,
            function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/search/:search', function(req, res, next) {
        const params = decrypt(req.params.search);
        trainingPlanRepository.Search(
            params,
            (err, data) => {
                res.err = err;
                res.data = data;
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
        console.log(req.body);
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
