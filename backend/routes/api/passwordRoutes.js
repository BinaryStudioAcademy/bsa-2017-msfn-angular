const
    apiResponse = require('express-api-response'),
    passwordService = require('../../services/passwordService'),
    userRepository = require('../../repositories/userRepository'),
    baseUrl = '/api/password/';

module.exports = function (app) {

    app.post(baseUrl, function (req, res, next) {
        passwordService.createConfirmCode(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':confirm-code', function (req, res, next) {
        passwordService.updateItem(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
