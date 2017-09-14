const
    eventRepository = require('../../repositories/eventRepository'),
    apiResponse = require('express-api-response'),
    eventService = require('../../services/eventService'),
    baseUrl = '/api/event/';

module.exports = app => {
    app.get(`${baseUrl}`, (req, res, next) => {
        eventService.getAllItems((err, data) => {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}user/:id`, (req, res, next) => {
        eventService.getItemsByUserId(req, (err, data) => {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}dates`, (req, res, next) => {
        eventService.getItemsByDates(req, (err, data) => {
            if (!data.length) {
                data = [{}];
            }
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

    app.put(`${baseUrl}:id/apply`, (req, res, next) => {
        EventService.updateByOther(req.params.id, req.body, (err, data) => {
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
