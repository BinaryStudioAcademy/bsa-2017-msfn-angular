const apiResponse = require('express-api-response');
const express = require('express');
const router = express.Router();
const exerciseTypeLoadService = require('../../../services/exerciseLoadServices/exerciseTypeLoadService');

router.get('/types', function (req, res, next) {
    console.log('/types works');
    exerciseTypeLoadService.createAllTypes(function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);

module.exports = router;