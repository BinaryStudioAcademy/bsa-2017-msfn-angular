const
    eventRepository = require('../../repositories/eventRepository'),
    apiResponse = require('express-api-response'),
    eventService = require('../../services/eventService'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    baseUrl = '/api/event/';

module.exports = app => {
    app.get(baseUrl + ':id', isLoggedIn, function (req, res, next) {
        eventService.getItemById(req, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}`, isLoggedIn, (req, res, next) => {
        eventService.getAllItems((err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}user/:id`, isLoggedIn, (req, res, next) => {
        eventService.getItemsByUserId(req, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}period/:startTimeStamp/:endTimeStamp`, isLoggedIn, (req, res, next) => {
        eventService.getItemsByDates(req.params, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}participants/:id`, isLoggedIn, (req, res, next) => {
        eventService.getApplicants('participants', req, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}followers/:id`, isLoggedIn, (req, res, next) => {
        eventService.getApplicants('followers', req, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}messages/:id`, isLoggedIn, (req, res, next) => {
        eventService.getMessages(req, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, isLoggedIn, (req, res, next) => {
        eventService.addItem(req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}:id`, isLoggedIn, (req, res, next) => {
        eventRepository.update(req.params.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}apply/:id`, isLoggedIn, (req, res, next) => {
        eventService.applyUser(req.params.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}unapply/:id`, isLoggedIn, (req, res, next) => {
        eventService.unapplyUser(req.params.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(`${baseUrl}:id`, isLoggedIn, (req, res, next) => {
        eventService.deleteItem(req.params.id, req.session.passport.user, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
