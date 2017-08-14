const
    apiResponse = require('express-api-response'),
    confirmRegistrationService = require('../../services/confirmRegistrationService'),
    baseUrl = '/api/confirm-registration/';

module.exports = function (app) {

    app.get(baseUrl + ':id', function (req, res, next) {
        confirmRegistrationService.confirmEmail(req.params.id, function (err, data) {
            if (data) {res.redirect('/confirm-registration');}
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        confirmRegistrationService.sendEmail(req.body.code, function (err, data) {
            if (data) {res.redirect('..'); res.send({hello: "mansfic"})}
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
