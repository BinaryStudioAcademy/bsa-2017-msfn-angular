const
    apiResponse = require('express-api-response'),
    launchedTrainingService = require('../../services/launchedTrainingService'),
    baseUrl = '/api/launchedtraining';

module.exports = function (app) {

    app.post(baseUrl, function (req, res, next) {
        launchedTrainingService.createLaunchedTraining(req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl, function (req, res, next) {
        launchedTrainingService.updateLaunchedTraining(req.body._id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl, function (req, res, next) {
        launchedTrainingService.deleteLaunchedTraining(req.body._id, (err, data) => {
            res.err = err;
            res.data = data;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/:id', function (req, res, next) {
        launchedTrainingService.getLaunchedTraining(req.params.id, (err, data) => {
            if (data instanceof Array && !data.length) {
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/user/:id', function (req, res, next) {
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
