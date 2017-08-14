const
    apiResponse = require('express-api-response'),
    exerciseService = require('../../services/exerciseService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    baseUrl = '/api/exercise/';

module.exports = function (app) {

    app.post(baseUrl, function (req, res, next) {
        exerciseService.createExercise(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl, function (req, res, next) {
        exerciseService.getAllExercises(function (err, data) {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':id', function (req, res, next) {
        exerciseService.upadeteExerciseById(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', function (req, res, next) {
        exerciseService.deleteExerciseById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
