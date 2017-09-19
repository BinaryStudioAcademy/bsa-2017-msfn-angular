const
    apiResponse = require('express-api-response'),
    userService = require('../../services/userService'),
    userRepository = require('../../repositories/userRepository'),
    baseUrl = '/api/user/',
    subscribeRoutes = require('./subscribeRoutes'),
    activateRoutes = require('./activateRoutes'),
    coachService = require('../../services/coachService'),
    initFakeService = require('../../services/initFakeService'),
    isUserSessionUser = require('../../middleware/isUserSessionUser.js'),
    isAdmin = require('../../middleware/isAdminMiddleware'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    changeMailRoutes = require('./changeMailRoutes');

module.exports = function (app) {
    app.get(baseUrl + 'me', isLoggedIn, function (req, res, next) {
        userRepository.getById(req.session.passport.user, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'me/measures', isLoggedIn, function (req, res, next) {
        userRepository.getById(req.session.passport.user, function (err, data) {
            if(data.settings){
                res.data = data.settings;
            } else{
                res.data = {};
            }
            res.err = err;
            next();
        });
    }, apiResponse);


    app.get(baseUrl + 'me/weights', isLoggedIn, function (req, res, next) {
        userRepository.getById(req.session.passport.user, function (err, data) {
            res.data = {};
            if(data.weight){
                res.data.weight = data.weight;
            }
            if(data.weightControl){
                res.data.weightControl = data.weightControl;
            } else{
                res.data.weightControl = [];
            }
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'me/oldstatus', isLoggedIn, function (req, res, next) {
        userRepository.getById(req.session.passport.user, function (err, data) {
            res.data = {
                registrationDate: data.registrationDate,
                lastActivityDate: data.lastActivityDate,
                comboCount: data.comboCount
            };
            res.err = err;
            next();
        });
    }, apiResponse);

    app.use(baseUrl + 'activate', activateRoutes);

    app.use(baseUrl + 'changemail', isLoggedIn, changeMailRoutes);

    app.get(baseUrl, isLoggedIn, function (req, res, next) {
        userRepository.getAll(function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + ':id', function (req, res, next) {
        userService.getUserById(req, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'coach-status-request/:id', isLoggedIn, (req, res, next) => {
         coachService.apply(req.params.id, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.get(baseUrl + 'generate-faked-data/true', (req, res, next) => {
        initFakeService.generate((err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post(baseUrl, function (req, res, next) {
        userService.addItem(req.body, function (err, data) {
            res.data = {
                "registered": "true"
            };
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + 'secondaryEmail/:id', isLoggedIn, function (req, res, next) {
        userService.addEmailToItem(req.params.id, req.body, function (err, data) {

            res.data = {
                addedEmail: req.body.newSecondaryEmail,
                status: 'ok'
            };
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + 'coach-request/:id', isAdmin, (req, res, next) => {
        userRepository.processRequest(req.params.id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put(baseUrl + ':id', isUserSessionUser, function (req, res, next) {
        userService.updateItem(req.params.id, req.body, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.use(baseUrl + 'subscribe', subscribeRoutes);

    app.delete(baseUrl + ':id', isAdmin, function (req, res, next) {
        userRepository.deleteById(req.params.id, function (err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
