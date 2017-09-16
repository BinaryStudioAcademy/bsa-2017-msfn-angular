const
    apiResponse = require('express-api-response'),
    fileService = require('../../services/fileService'),
    baseUrl = '/api/file/';

module.exports = function (app) {
    app.post(baseUrl + 'remote/:url', function(req, res, next) {
         fileService.SaveFileByUrl(req.params.url, (err, data) => {
             res.data = data;
             res.err = err;
             next();
         });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        fileService.save(req, res, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        })
    }, apiResponse);
};
