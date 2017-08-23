const
    apiResponse = require('express-api-response'),
    goalTypeService = require('../../services/goalTypeService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    baseUrl = '/api/goal-type/';

module.exports = function (app) {

    app.get(baseUrl, isAdmin, function (req, res, next) {
        goalTypeService.getGoals(function(err, data) {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, isAdmin, function (req, res, next) {
       goalTypeService.addGoalType(req.body.name, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);


    app.delete(baseUrl + ':name', isAdmin, function (req, res, next) {
        goalTypeService.deleteGoalType(req.params.name, function(err, data) {
            res.err = err;
            res.data = data;
            next();
       });
    }, apiResponse);
};
