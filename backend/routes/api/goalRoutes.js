const
    apiResponse = require('express-api-response'),
    goalService = require('../../services/goalService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    baseUrl = '/api/goal/';

module.exports = function (app) {

    app.post(baseUrl, isAdmin, function (req, res, next) {
       goalService.createGoal(req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.put(baseUrl, isAdmin, function (req, res, next) {
        goalService.updateGoal(req.body.id, req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.delete(baseUrl + ':id', isAdmin, function (req, res, next) {
        goalService.deleteGoal(req.params.id, function(err, data) {
            res.err = err;
            res.data = data;
            next();
       });
    }, apiResponse);

    app.get(baseUrl, function (req, res, next) {
        goalService.getGoals(function(err, data) {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
