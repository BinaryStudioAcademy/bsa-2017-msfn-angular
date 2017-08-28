const
apiResponse = require('express-api-response'),
trainingPlanService = require('../../services/trainingPlanService'),
baseUrl = '/api/training-plan';

module.exports = function (app) {
    app.get(baseUrl, function (req, res, next) {
        trainingPlanService.get({userID: req.session.passport.user}, function (err, data) {
            if (!data.length) {
                data = [];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + '/:id', function (req, res, next) {
        console.log(req.params);
        trainingPlanService.get({_id: req.params.id, userID: req.session.passport.user}, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        trainingPlanService.add(req, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + '/:id', function (req, res, next) {
        trainingPlanService.update(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete(baseUrl + '/:id', function (req, res, next) {
        trainingPlanService.delete(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

}