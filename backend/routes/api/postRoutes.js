const
    apiResponse = require('express-api-response'),
    postRepository = require('../../repositories/postRepository'),
    postService = require('../../services/postService'),
    baseUrl = '/api/post/';

module.exports = app => {
    app.get(baseUrl, (req, res, next) => {
        postService.getItemsByUserId(req._id, (err, data) => {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, (req, res, next) => {
        postService.addItem(req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}edit/:id`, (req, res, next) => {
        postService.updateItem(req.params.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(`${baseUrl}delete/:id`, (req, res, next) => {
        postService.deleteItem(req.params.id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
