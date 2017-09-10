const
    apiResponse = require('express-api-response'),
    achievementsService = require('../../services/achievementsService'),
    express = require('express'),
    router = express.Router();
    baseUrl = '/api/achievements/';

module.exports = function (app) {

    app.get(baseUrl + ':/id', function (req, res, next) {
        achievementsService.getAchievement(req.params.id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);

    app.get(baseUrl, function (req, res, next) {
        achievementsService.getAllAchievements((err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);

    app.get(baseUrl + '/user/:id', function (req, res, next) {
        achievementsService.getUserAchievements(req.params.id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);

        app.post(baseUrl + '/user/:id', function (req, res, next) {
        achievementsService.addUserAchievement(req.params.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
};
