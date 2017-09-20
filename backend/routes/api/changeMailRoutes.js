const
    apiResponse = require('express-api-response'),
    changeMailService = require('../../services/changeMailService'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    express = require('express'),
    router = express.Router();

router.post('/', isLoggedIn, function (req, res, next) {
    changeMailService.genNewRootMail(req.body, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.get('/:code', isLoggedIn, function (req, res, next) {
    changeMailService.checkNewRootMail(req.params.code, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);


module.exports = router;
