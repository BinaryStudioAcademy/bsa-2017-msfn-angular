const express = require('express');
const router = express.Router();
const apiResponse = require('express-api-response');
const exerciseLoadService = require('../../../services/exerciseLoadServices/exerciseLoadService');

router.get('/exercises', function (req, res, next) {
    exerciseLoadService.createAllExercises(function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

module.exports = router;
