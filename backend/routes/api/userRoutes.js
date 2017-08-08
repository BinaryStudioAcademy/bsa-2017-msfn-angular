const
    apiResponse = require('express-api-response'),
    userService = require('../../services/userService'),
    userRepository = require('../../repositories/userRepository'),
    baseUrl = '/api/user/';

const GoogleCalendar = require('../../services/googleCalendarService');

module.exports = function (app) {
    app.get(baseUrl+'me', function (req, res, next) {
        res.data = req.session.user;
        next();
    }, apiResponse);

    app.get(baseUrl, function (req, res, next) {

        GoogleCalendar();
        next();
        // userRepository.getAll(function (err, data) {
        //     res.data = data;
        //     res.err = err;
        //     next();
        // });
    }, apiResponse);

    app.get(baseUrl + ':id', function (req, res, next) {
        userRepository.getById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        userService.addItem(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':id', function (req, res, next) {
        userService.updateItem(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', function (req, res, next) {
        userRepository.deleteById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
