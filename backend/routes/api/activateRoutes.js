const
    apiResponse = require('express-api-response'),
    activateService = require('../../services/activateService'),
    express = require('express'),
    router = express.Router();

router.post('/', function (req, res, next) {
    activateService.checkActivateCode(req.body, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);


module.exports = router;
