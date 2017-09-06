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
        body = req.body;
        body.isRemoved = false;
        foodTypeService.addFoodType(body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + ':id', isAdmin, (req, res, next) => {
        foodTypeService.deleteFoodType(req.params.id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);


    app.put(baseUrl, isAdmin, function (req, res, next) {
        foodTypeService.updateFoodType(req.body._id, req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

};
