const
    apiResponse = require('express-api-response'),
    userRepository = require('../../repositories/userRepository'),
    weightControlService = require('../../services/weightControlService'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    baseUrl = '/api/weight-control/';

module.exports = function (app) {
    app.get(baseUrl, isLoggedIn, (req, res, next) => {
        userRepository.getById(req.user._id, (err, data) => {
            if (!data.weightControl.length){
                data.weightControl = [{}];
            }
            res.data = data.weightControl;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}add`, isLoggedIn, (req, res, next) => {
        weightControlService.addItem(req.user._id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(`${baseUrl}delete`, isLoggedIn, (req, res, next) => {
        weightControlRepository.deleteItem(req, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
