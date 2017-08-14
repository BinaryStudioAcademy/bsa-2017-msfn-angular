const
    apiResponse = require('express-api-response'),
    activateService = require('../../services/activateService'),
    express = require('express'),
    router = express.Router();

router.get('/', function (req, res, next) {
    activateService.checkActivateCode(req.query, function (err, data) {
        if (!err) {
            res.redirect('/');
        }
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

router.put('/changemail', function (req, res, next) {
    activateService.checkNewRootMail(req.body, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);


module.exports = router;
