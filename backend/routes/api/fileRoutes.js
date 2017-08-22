const
    apiResponse = require('express-api-response'),
    fileService = require('../../services/fileService'),
    baseUrl = '/api/file/';

module.exports = function (app) {

    app.post(baseUrl, function (req, res, next) {
        fileService.save(req, res, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
}