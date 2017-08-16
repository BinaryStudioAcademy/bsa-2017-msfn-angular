const
    apiResponse = require('express-api-response'),
    weightControlService = require('../../services/weightControlService'),
    weightControlRepository = require('../../repositories/weightControlRepository'),
    baseUrl = '/api/weight-control/';

module.exports = function (app) {

    app.get(baseUrl, (req, res, next) => {
        weightControlRepository.getAll((err, data) => {
            if (!data.length){
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', (req, res, next) => {
        weightControlRepository.getById(req.params.id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, (req, res, next) => {
        weightControlRepository.add(req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':id', (req, res, next) => {
        weightControlService.updateItem(req.body.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', (req, res, next) => {
        weightControlRepository.deleteById(req.params.id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
