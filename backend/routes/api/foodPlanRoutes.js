const
    apiResponse = require('express-api-response'),
    foodPlanService = require('../../services/foodPlanService'),
    foodPlanRepository = require('../../repositories/foodPlanRepository'),
    ApiError = require('../../services/apiErrorService'),
    decrypt = require('../../services/decryptService'),
    baseUrl = '/api/food-plan';

module.exports = function (app) {
    app.get(baseUrl, function (req, res, next) {
        foodPlanService.get({userID: req.session.passport.user}, function (err, data) {
            if (!data.length) {
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/user/:id', function (req, res, next) {
        foodPlanService.get({userID: req.params.id}, function (err, data) {
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

        if (isNaN(params.limit)) {
            params.limit = null;
        }
        if (isNaN(params.offset)) {
            params.offset = null;
        }
        foodPlanRepository.get(
            params,
            function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/:id', function (req, res, next) {
        foodPlanService.get({_id: req.params.id, userID: req.session.passport.user}, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        const newPlan = req.body;
        newPlan.userID = req.session.passport.user;
        foodPlanService.add(newPlan, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + '/:id', function (req, res, next) {
        foodPlanService.update(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + '/:id', function (req, res, next) {
        foodPlanService.delete(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
