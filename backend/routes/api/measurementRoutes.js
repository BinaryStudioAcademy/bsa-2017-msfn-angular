const
    apiResponse = require('express-api-response'),
    measurementService = require('../../services/measurementService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    baseUrl = '/api/measurement/';

module.exports = function (app) {

    app.post(baseUrl, function (req, res, next) {
       measurementService.createMeasurement(req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.put(baseUrl, function (req, res, next) { 
        measurementService.updateMeasurement(req.body.id, req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.delete(baseUrl, function (req, res, next) {
        measurementService.deleteMeasurement(req.body.id, function(err, data) {
            res.err = err;
            res.data = data;
            next();
       });
    }, apiResponse);

    app.get(baseUrl, function (req, res, next) {
            measurementService.getAllMeasurements(function(err, data) {
            if (!data.length){
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

        app.get(baseUrl + ":id/", function (req, res, next) {
            measurementService.getMeasurement(req.params.id, function(err, data) {
            if (!data.length){
                data = [];
            }
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

    app.get(baseUrl + "by-name/:name/", function (req, res, next) {
            measurementService.getMeasurementByName(req.params.name, function(err, data) {
            if (!data.length){
                data = [];
            }
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
