const
    apiResponse = require('express-api-response'),
    activateService = require('../../services/activateService'),
    loginService = require('../../services/loginService'),
    express = require('express'),
    router = express.Router();

router.get('/:token', function (req, res, next) {
    activateService.checkActivateCode(req.params.token, function (err, user) {
        
        if (!err) {
            req.body.user = {
                password: user.password,
                email: user.email
            };
            loginService.loginConfirmedUser(req, res, next);
        }
        // res.data = {
        //     status: 'ok'
        // }
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
        console.log(data);
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
