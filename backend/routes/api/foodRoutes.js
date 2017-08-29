const
    apiResponse = require('express-api-response'),
    foodService = require('../../services/foodService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    baseUrl = '/api/food/';

module.exports = function(app) {

    app.post(baseUrl, isAdmin, (req, res, next) => {
        foodService.createFood(req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl, isAdmin, (req, res, next) => {
        foodService.updateFood(req.body.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(`${baseUrl}:id`, isAdmin, (req, res, next) => {
        foodService.deleteFood(req.params.id, (err, data) => {
            res.err = err;
            res.data = data;
            next();
        });
    }, apiResponse);

    app.get(baseUrl, isAdmin, (req, res, next) => {
        foodService.getAllFood((err, data) => {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
