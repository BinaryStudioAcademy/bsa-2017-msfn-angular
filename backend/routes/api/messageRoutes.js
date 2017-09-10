const
    apiResponse = require('express-api-response'),
    messageService = require('../../services/messageService'),
    baseUrl = '/api/message/';

module.exports = app => {
    app.get(`${baseUrl}user/:id`, (req, res, next) => {
        messageService.getItemsByUserId(req, (err, data) => {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, (req, res, next) => {
        messageService.addItem(req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}:id`, (req, res, next) => {
        messageService.updateItem(req.params.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(`${baseUrl}:id`, (req, res, next) => {
        messageService.deleteItem(req.params.id, req.session.passport.user, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
