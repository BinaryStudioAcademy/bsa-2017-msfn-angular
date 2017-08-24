const
apiResponse = require('express-api-response'),
trainingPlanService = require('../../services/trainingPlanService'),
baseUrl = '/api/training-plan';

module.exports = function (app) {
    app.get(baseUrl, function (req, res, next) {
        trainingPlanService.get(false, function (err, data) {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        trainingPlanService.add(req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

}