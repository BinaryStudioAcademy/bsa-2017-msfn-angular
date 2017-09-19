const apiResponse = require('express-api-response'),
    subscribeService = require('../../services/subscribeService'),
    isLoggedIn = require('../../middleware/isLoggedInMiddleware'),
    express = require('express'),
    router = express.Router();

router.get('/following/:id', isLoggedIn, function (req, res, next) {
    subscribeService.getFollowing(req, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.get('/followers/:id', isLoggedIn, function (req, res, next) {
    subscribeService.getFollowers(req, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.post('/follow', isLoggedIn, function (req, res, next) {
    subscribeService.follow(req, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.post('/unfollow', isLoggedIn, function (req, res, next) {
    subscribeService.unfollow(req, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

module.exports = router;
