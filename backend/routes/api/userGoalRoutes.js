const
    apiResponse = require('express-api-response'),
    userGoalService = require('../../services/userGoalService'),
    baseUrl = '/api/user-goal/';
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),

module.exports = function (app) {

    app.post(baseUrl, isLoggedIn, function (req, res, next) {
        console.log(req.user);
      body = {
               type: req.body.type,
               createdByUser: req.user._id,
               value: req.body.value,
               deadline: req.body.deadline,
               startTime: req.body.startTime
           }
       userGoalService.createUserGoal(body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.put(baseUrl, isLoggedIn, function (req, res, next) {
            body = {
               type: req.body.type,
               createdByUser: req.user._id,
               value: req.body.value,
               deadline: req.body.deadline
           }
           console.log(body);
        userGoalService.updateUserGoal(req.body._id, body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
       });
    }, apiResponse);

    app.delete(baseUrl + ':id', isLoggedIn, function (req, res, next) {
        userGoalService.deleteUserGoal(req.params.id, req.user._id,  function(err, data) {
            res.err = err;
            res.data = data;
            next();
       });
    }, apiResponse);

    app.get(baseUrl, isLoggedIn, function (req, res, next) {
        userGoalService.getUserGoalById(req.user._id, function(err, data) {
            if (!data.length) {
                data = [{}];
            }
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
