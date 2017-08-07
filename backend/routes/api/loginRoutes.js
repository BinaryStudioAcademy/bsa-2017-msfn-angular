const
    apiResponse = require('express-api-response'),
    loginService = require('../../services/loginService'),
    passportStrategy = require('../../middleware/passportStrategyMiddleware'),
    baseUrl = '/api/login/';

module.exports = function (app) {

    app.post(baseUrl, function (req, res, next) {
        loginService.login(req, res, next)
    }, apiResponse);

}