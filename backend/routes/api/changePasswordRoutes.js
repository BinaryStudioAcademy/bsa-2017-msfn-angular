const
    apiResponse = require('express-api-response'),
    changePasswordService = require('../../services/changePasswordService'),
    baseUrl = '/api/change-password/';

module.exports = function (app) {

    app.put(baseUrl, function (req, res, next) {
        changePasswordService(req, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
}