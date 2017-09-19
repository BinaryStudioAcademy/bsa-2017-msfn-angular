const
    apiResponse = require('express-api-response'),
    tribeService = require('../../services/tribeService'),
    postService = require('../../services/postService'),
    baseUrl = '/api/tribe/';

module.exports = function (app) {

    app.get(baseUrl, (req, res, next) => {
        console.log('get tribe (routes)');
        tribeService.getAllTribes( (err, data) => {
            if (!data.length) {
                data = [{}];
                console.log('empty data(routes)');
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}:id`, (req, res, next) => {
        tribeService.getTribeById(req.params.id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}/author/:creator`, (req, res, next) => {
        tribeService.getTribesByCreatorId(req.body.creator, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}:id/posts`, (req, res, next) => {
        postService.getPostsByTribeId(req.body.tribe, (err, data) => {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    // ???
    app.get(`${baseUrl}:id/posts/author/:author`, (req, res, next) => {
        postService.getPostsByCreatorAndTribe(
            req.body.author, req.body.tribe, (err, data) => {
                if (!data.length) {
                    data = [{}];
                }
                res.data = data;
                res.err = err;
                next();
            });
    }, apiResponse);

    app.post(baseUrl, (req, res, next) => {
        const body = req.body;
        tribeService.createTribe(body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(`${baseUrl}:id/posts`, (req, res, next) => {
        const body = req.body;
        postService.createPost(body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}:id`, (req, res, next) => {
        tribeService.updateTribeById(req.body.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}:id/posts/`, (req, res, next) => {

    })
};
