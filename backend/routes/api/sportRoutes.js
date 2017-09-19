const
    apiResponse = require('express-api-response'),
    sportService = require('../../services/sportService'),
    sportRepository = require('../../repositories/sportRepository'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    baseUrl = '/api/sport/';

module.exports = app => {
    app.get(baseUrl, isLoggedIn, (req, res, next) => {
        sportRepository.getAll((err, data) => {
            if (!data.length){
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':code', isLoggedIn, (req, res, next) => {
        sportRepository.getByCode(req.params.code, (err, data) => {
            if (!data){
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, isAdmin, (req, res, next) => {
        sportService.addItem(req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':code', isAdmin, (req, res, next) => {
        sportService.updateItem(req.body.code, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':code', isAdmin, (req, res, next) => {
        sportService.deleteItem(req.params.code, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
