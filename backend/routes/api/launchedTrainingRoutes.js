const
    apiResponse = require('express-api-response'),
    launchedTrainingService = require('../../services/launchedTrainingService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    baseUrl = '/api/launchedtraining';

module.exports = function (app) {

    app.post(baseUrl, isLoggedIn, function (req, res, next) {
        launchedTrainingService.createLaunchedTraining(req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl, isLoggedIn, function (req, res, next) {
        launchedTrainingService.updateLaunchedTraining(req.body._id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl, isAdmin, function (req, res, next) {
        launchedTrainingService.deleteLaunchedTraining(req.body._id, (err, data) => {
            res.err = err;
            res.data = data;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/:id', isLoggedIn, function (req, res, next) {
        launchedTrainingService.getLaunchedTraining({_id: req.params.id}, (err, data) => {
            if (data instanceof Array && !data.length) {
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/user/:id', isLoggedIn, function (req, res, next) {
        launchedTrainingService.getLaunchedTrainingsByUserId(req.params.id, (err, data) => {
            if (data instanceof Array && !data.length) {
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
