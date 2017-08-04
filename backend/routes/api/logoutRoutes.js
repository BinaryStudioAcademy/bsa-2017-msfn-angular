const
    apiResponse = require('express-api-response'),
    logoutService = require('../../services/logoutService'),
    passportStrategy = require('../../middleware/passportStrategyMiddleware'),
    baseUrl = '/api/logout/';

module.exports = function (app) {

    app.post(baseUrl, function (req, res, next) {
        logoutService.logout(req, res, next)
    }, apiResponse);

}