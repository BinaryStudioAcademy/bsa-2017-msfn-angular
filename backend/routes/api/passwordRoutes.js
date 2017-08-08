const
    apiResponse = require('express-api-response'),
    passwordService = require('../../services/passwordService'),
    baseUrl = '/api/password/';

module.exports = function (app) {

    app.post(baseUrl, function (req, res, next) {
        passwordService.createConfirmCode(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl, function (req, res, next) {
        passwordService.checkConfirmCode(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
