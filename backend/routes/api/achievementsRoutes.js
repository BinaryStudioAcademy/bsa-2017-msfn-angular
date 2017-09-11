const
    apiResponse = require('express-api-response'),
    achievementsService = require('../../services/achievementsService'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    express = require('express'),
    router = express.Router();
    baseUrl = '/api/achievements/';

module.exports = function (app) {

    app.get(baseUrl + ':/id', isLoggedIn, function (req, res, next) {
        achievementsService.getAchievement(req.params.id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);

    app.get(baseUrl, isLoggedIn, function (req, res, next) {
        achievementsService.getAllAchievements((err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);

    app.get(baseUrl + '/user/', isLoggedIn, function (req, res, next) {
        achievementsService.getUserAchievements(req.user._id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);

        app.post(baseUrl + '/user/', isLoggedIn, function (req, res, next) {
        achievementsService.addUserAchievement(req.user._id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
};
