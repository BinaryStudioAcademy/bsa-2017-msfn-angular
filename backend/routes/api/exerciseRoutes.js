const
    apiResponse = require('express-api-response'),
    exerciseService = require('../../services/exerciseService'),
    exerciseRepository = require('../../repositories/exerciseRepository'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    baseUrl = '/api/exercise/';
module.exports = function (app) {

    app.post(baseUrl, isAdmin, function (req, res, next) {
        body = req.body;
        body.isRemoved = false;
        exerciseService.createExercise(body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl, isLoggedIn, function (req, res, next) {
        exerciseService.getAllExercises(function (err, data) {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl+'type/:type', isLoggedIn, function (req, res, next) {
        exerciseService.getExercisesByType(req.params.category, function (err, data) {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl+'sport/:id', isLoggedIn, function (req, res, next) {
        exerciseService.getExercisesBySport(req.params.id, function (err, data) {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', isLoggedIn, function (req, res, next) {
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

    app.put(baseUrl + 'sport/:id', isAdmin, function (req, res, next) {
        exerciseRepository.pushExercisesSport(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl + 'sport', isAdmin, function (req, res, next) {
        exerciseRepository.removeSportFromAllExercises(req.body, function (err, data) {
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
