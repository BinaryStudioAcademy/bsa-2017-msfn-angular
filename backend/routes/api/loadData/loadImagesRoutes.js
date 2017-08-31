const express = require('express');
const router = express.Router();
const apiResponse = require('express-api-response');
const exerciseImagesLoadService = require('../../../services/exerciseLoadServices/exerciseImagesLoadService');

router.get('/images', function (req, res, next) {
    exerciseImagesLoadService.addImages(function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

module.exports = router;
