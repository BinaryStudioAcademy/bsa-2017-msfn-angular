const
    apiResponse = require('express-api-response'),
    exerciseTypeService = require('../../services/exerciseTypeService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    baseUrl = '/api/exercise-type/';

module.exports = function (app) {

    app.post(baseUrl, isAdmin, function (req, res, next) {
        exerciseTypeService.createExerciseType({name: req.body.name}, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.put(baseUrl, isAdmin, function (req, res, next) {
        exerciseTypeService.updateExerciseTypeById(req.body._id, req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.delete(baseUrl + ':id', isAdmin, function (req, res, next) {
        exerciseTypeService.deleteExerciseTypeById(req.params.id, function(err, data) {
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
