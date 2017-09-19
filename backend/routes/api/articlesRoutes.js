const
    apiResponse = require('express-api-response'),
    articlesService = require('../../services/articlesService'),
    articlesRepository = require('../../repositories/articlesRepository'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    decrypt = require('../../services/decryptService'),
    ApiError = require('../../services/apiErrorService'),
    baseUrl = '/api/articles/';

module.exports = function (app) {

    app.get(baseUrl, isLoggedIn, function (req, res, next) {
        articlesService.get('', function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', isLoggedIn, function (req, res, next) {
        articlesService.get({_id: req.params.id}, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'user/:id', isLoggedIn, function (req, res, next) {
        articlesService.get({userId: req.params.id}, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'filter/:filter', isLoggedIn, function(req, res, next) {
        const params = decrypt(req.params.filter);
        articlesService.get(
            params,
            (err, data) => {
                res.err = err;
                res.data = data;
                next();
            });
    }, apiResponse);

    app.get(baseUrl + 'search/:search', isLoggedIn, function(req, res, next) {
        const params = decrypt(req.params.search);
        articlesRepository.Search(
            params,
            (err, data) => {
                res.err = err;
                res.data = data;
                next();
            });
    }, apiResponse);

    app.post(baseUrl, isLoggedIn, function (req, res, next) {
        articlesService.add(req, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':id', isLoggedIn, function (req, res, next) {
        articlesService.update(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', isAdmin, function (req, res, next) {
        articlesService.delete(req.params.id, function (err, data) {
            res.err = err;
            res.data = data;
            next();
        });
    }, apiResponse);


};
