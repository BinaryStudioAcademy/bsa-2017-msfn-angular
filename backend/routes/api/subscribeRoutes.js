const
    apiResponse = require('express-api-response'),
    subscribeService = require('../../services/subscribeService');
var express = require('express');
var router = express.Router();

router.get('/following', function (req, res, next) {
    subscribeService.getFollowing(req, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.get('/followers', function (req, res, next) {
    subscribeService.getFollowers(req, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.post('/follow', function (req, res, next) {
    subscribeService.follow(req, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

router.post('/unfollow', function (req, res, next) {
    subscribeService.unfollow(req, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

module.exports = router;