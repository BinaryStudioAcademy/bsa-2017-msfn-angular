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


module.exports = router;
