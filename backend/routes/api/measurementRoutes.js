const
    apiResponse = require('express-api-response'),
    measurementService = require('../../services/measurementService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    baseUrl = '/api/measurement/';

module.exports = function (app) {

    app.post(baseUrl, isAdmin, function (req, res, next) {
       measurementService.createMeasurement(req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.put(baseUrl, isAdmin, function (req, res, next) { 
        measurementService.updateMeasurement(req.body.id, req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.delete(baseUrl, isAdmin, function (req, res, next) {
        measurementService.deleteMeasurement(req.body.id, function(err, data) {
            res.err = err;
            res.data = data;
            next();
       });
    }, apiResponse);

    app.get(baseUrl, isLoggedIn, function (req, res, next) {
            measurementService.getAllMeasurements(function(err, data) {
            if (data instanceof Array && !data.length){
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.get(baseUrl + ":id/", isLoggedIn, function (req, res, next) {
        measurementService.getMeasurement(req.params.id, function(err, data) {
            if (data instanceof Array && data.length == 1){
                res.data = data[0];
            }else if (data instanceof Array && data.length == 0){
                res.data = {};
            } else {
                res.data = data;
            }
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + "by-name/:name/", isLoggedIn, function (req, res, next) {
            measurementService.getMeasurementByName(req.params.name, function(err, data) {
            if (data instanceof Array && data.length == 1){
                res.data = data[0];
            }else if (data instanceof Array && data.length == 0){
                res.data = {};
            } else {
                res.data = data;
            }
            res.err = err;
            next();
       });
    }, apiResponse);

};
