const
    apiResponse = require('express-api-response'),
    articlesService = require('../../services/articlesService'),
    baseUrl = '/api/articles/';

module.exports = function (app) {

    app.get(baseUrl, function (req, res, next) {
        articlesService.get('', function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', function (req, res, next) {
        articlesService.get({_id: req.params.id}, function (err, data) {
            console.log(err);
            console.log(data);
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'user/:id', function (req, res, next) {
        articlesService.getByUser({_id: req.params.id}, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
    app.post(baseUrl, function (req, res, next) {
        articlesService.add(req, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl, function (req, res, next) {
        articlesService.update(req.body.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', function (req, res, next) {
        articlesService.delete(req.params.id, function (err, data) {
            res.err = err;
            res.data = data;
            next();
        });
    }, apiResponse);


};
