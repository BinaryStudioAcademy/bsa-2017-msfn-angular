const
    apiResponse = require('express-api-response'),
    exerciseTypeService = require('../../services/exerciseTypeService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    baseUrl = '/api/exercise-type/';

module.exports = function (app) {

    app.post(baseUrl, isAdmin, function (req, res, next) {
       exerciseTypeService.createExerciseType(req.body.name, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.put(baseUrl, isAdmin, function (req, res, next) {
        exerciseTypeService.updateExerciseTypeByCode(req.body.code, req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.delete(baseUrl + ':code', isAdmin, function (req, res, next) {
        exerciseTypeService.deleteExerciseTypeByCode(req.params.code, function(err, data) {
            res.err = err;
            res.data = data;
            next();
       });
    }, apiResponse);

    app.get(baseUrl, function (req, res, next) {
        exerciseTypeService.getAllExerciseTypes(function(err, data) {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
