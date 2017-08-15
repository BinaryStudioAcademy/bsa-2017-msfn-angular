const
    apiResponse = require('express-api-response'),
    activateService = require('../../services/activateService'),
    express = require('express'),
    router = express.Router();

router.get('/:token', function (req, res, next) {
    activateService.checkActivateCode(req.params.token, function (err, data) {
        // if (!err) {
        //     // TO CHANGE to valid url of registration-confirmation path
        //     res.redirect('http://localhost:3060/confirmation');
        // }
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
