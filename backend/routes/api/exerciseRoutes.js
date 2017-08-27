const
    apiResponse = require('express-api-response'),
    exerciseService = require('../../services/exerciseService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    baseUrl = '/api/exercise/';
module.exports = function (app) {

    app.post(baseUrl, isAdmin, function (req, res, next) {
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

    app.get(baseUrl+'type/:type', function (req, res, next) {
        exerciseService.getExercisesByType(req.params.type, function (err, data) {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', function (req, res, next) {
        exerciseService.getExerciseById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':id', isAdmin, function (req, res, next) {
        exerciseService.upadeteExerciseById(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', isAdmin, function (req, res, next) {
        exerciseService.deleteExerciseById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
