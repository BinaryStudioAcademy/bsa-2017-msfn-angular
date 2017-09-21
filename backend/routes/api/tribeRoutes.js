const
    apiResponse = require('express-api-response'),
    tribeService = require('../../services/tribeService'),
    postService = require('../../services/postService'),
    baseUrl = '/api/tribe/';

module.exports = function (app) {

    app.get(baseUrl, (req, res, next) => {
        tribeService.getAllTribes( (err, data) => {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}:id/`, (req, res, next) => {
        tribeService.getTribeById(req.params.id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}creator/:creator/`, (req, res, next) => {
        tribeService.getTribesByCreatorId(req.params.creator, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}:id/posts/`, (req, res, next) => {
        postService.getPostsByTribeId(req.params.id, (err, data) => {
            if (!data) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(`${baseUrl}:id/posts/author/:author/`, (req, res, next) => {
        postService.getPostsByCreatorAndTribe(
            req.params.author, req.params.id, (err, data) => {
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

    app.post(`${baseUrl}:id/posts/`, (req, res, next) => {
        const body = req.body;
        postService.createPost(body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl, (req, res, next) => {
        tribeService.updateTribeById(req.body.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}:id/posts/`, (req, res, next) => {
        postService.updatePostById(req.body.id, req.body,  (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
