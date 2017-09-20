const
    apiResponse = require('express-api-response'),
    goalService = require('../../services/goalService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    baseUrl = '/api/goal/';

module.exports = function (app) {

    app.post(baseUrl, isAdmin, function (req, res, next) {
        body = req.body;
        body.isRemoved = false; 
        goalService.createGoal(body, function(err, data) {
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

    app.get(baseUrl, isLoggedIn, function (req, res, next) {
        goalService.getGoals(function(err, data) {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', isLoggedIn, function (req, res, next) {
        goalService.getGoal(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
