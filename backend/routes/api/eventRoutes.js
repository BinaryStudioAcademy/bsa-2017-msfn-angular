const
    eventRepository = require('../../repositories/eventRepository'),
    apiResponse = require('express-api-response'),
    eventService = require('../../services/eventService'),
    baseUrl = '/api/event/';

module.exports = app => {
    app.get(baseUrl + ':id', function (req, res, next) {
        eventService.getItemById(req, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}`, (req, res, next) => {
        eventService.getAllItems((err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}user/:id`, (req, res, next) => {
        eventService.getItemsByUserId(req, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}period/:startTimeStamp/:endTimeStamp`, (req, res, next) => {
        eventService.getItemsByDates(req.params, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}participants/:id`, (req, res, next) => {
        eventService.getParticipants(req, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}followers/:id`, (req, res, next) => {
        eventService.getFollowers(req, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}messages/:id`, (req, res, next) => {
        eventService.getMessages(req, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, (req, res, next) => {
        eventService.addItem(req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}:id`, (req, res, next) => {
        eventRepository.update(req.params.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}apply/:id`, (req, res, next) => {
        eventService.applyUser(req.params.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(`${baseUrl}:id`, (req, res, next) => {
        eventService.deleteItem(req.params.id, req.session.passport.user, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
