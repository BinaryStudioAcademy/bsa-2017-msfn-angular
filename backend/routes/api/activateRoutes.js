const
    apiResponse = require('express-api-response'),
    activateService = require('../../services/activateService'),
    loginService = require('../../services/loginService'),
    express = require('express'),
    router = express.Router();

router.get('/:token', function (req, res, next) {
    loginService.loginConfirmedUser(req, res, next, function (err, user) {

        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.post('/resendactivation', function (req, res, next) {
    activateService.resendActivateCode(req.body, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.post('/changemail', function (req, res, next) {
    activateService.genNewRootMail(req.body, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.get('/changemail/:code', function (req, res, next) {
    activateService.checkNewRootMail(req.params.code, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);


module.exports = router;
