const
    apiResponse = require('express-api-response'),
    foodService = require('../../services/foodService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    baseUrl = '/api/food/';

module.exports = function (app) {

    app.post(baseUrl, isLoggedIn, (req, res, next) => {
        body = req.body;
        if (req.user.isAdmin) {
            body.customUserId = '';
            body.isPublished = true;
        } else {
            body.customUserId = req.user._id;
            body.isPublished = false;
        }
        body.isRemoved = false;
        foodService.createFood(body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl, isLoggedIn, (req, res, next) => {
        if (req.user.isAdmin) {
            customUserId = '';
        } else {
            customUserId = req.user._id;
        }
        foodService.updateFood(req.body._id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);




    app.delete(baseUrl + ':id', isLoggedIn, (req, res, next) => {
        if (req.user.isAdmin) {
            userId = '';
        } else {
            userId = req.user._id;
        }
        foodService.deleteFood(req.params.id, userId, (err, data) => {
            res.err = err;
            res.data = data;
            next();
        });
    }, apiResponse);

    app.get(baseUrl, isLoggedIn, (req, res, next) => {
        if (req.user.isAdmin) {
            userId = '';
        } else {
            userId = req.user._id;
        }
        foodService.getOnlyPublishedFood(userId, (err, data) => {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);


    app.get(baseUrl + 'all', isAdmin, (req, res, next) => {
        foodService.getAllFood((err, data) => {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);


    app.get(baseUrl + 'by-type/:name', isLoggedIn, (req, res, next) => {
        if (req.user.isAdmin) {
            userId = '';
        } else {
            userId = req.user._id;
        }
        foodService.getFoodByType(userId, req.params.name, (err, data) => {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + 'publish', isAdmin, (req, res, next) => {
        foodService.publishFood(req.body._id, req.body.isPublished, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
