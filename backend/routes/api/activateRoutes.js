const
    apiResponse = require('express-api-response'),
    express = require('express'),
    router = express.Router();

router.get('/:id', function (req, res, next) {
    activateService.getToken(req.body, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.post('/:id', function (req, res, next) {
    activateService.sendToken(req.body, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);


module.exports = router;
