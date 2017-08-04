const
    apiResponse = require('express-api-response'),
    loginService = require('../../services/loginService'),
    passportStrategy = require('../../middleware/passportStrategyMiddleware'),
    baseUrl = '/login/';

module.exports = function (app) {
    console.log('1')
    app.post(baseUrl, function (req, res, next) {
        console.log('2')
        loginService.login(req, res, next)
    }, apiResponse);
}