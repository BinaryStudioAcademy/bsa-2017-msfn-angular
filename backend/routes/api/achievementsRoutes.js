const
    apiResponse = require('express-api-response'),
    achievementsRepository = require('../../repositories/achievementsRepository'),
    express = require('express'),
    router = express.Router();
    baseUrl = '/api/achievenets/';

module.exports = function (app) {

    app.get(baseUrl + ':/id', function (req, res, next) {
        achievementsService.getById(req.params.id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);

    app.get(baseUrl, function (req, res, next) {
        achievementsService.getAll(req, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
};
