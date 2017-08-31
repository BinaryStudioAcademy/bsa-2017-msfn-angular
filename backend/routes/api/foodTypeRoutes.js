const
    apiResponse = require('express-api-response'),
    foodTypeService = require('../../services/foodTypeService'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    baseUrl = '/api/food-type/';

module.exports = function(app) {

    app.get(baseUrl, isAdmin, (req, res, next) => {
        foodTypeService.getAllFoodTypes((err, data) => {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, isAdmin, (req, res, next) => {
        foodTypeService.addFoodType(req.body.name, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(`${baseUrl}:name`, isAdmin, (req, res, next) => {
        foodTypeService.deleteFoodType(req.params.name, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
