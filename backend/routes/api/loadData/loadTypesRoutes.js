const apiResponse = require('express-api-response');
const express = require('express');
const router = express.Router();

router.get('/types', function (req, res, next) {
    console.log('/types works');
    next();
}, apiResponse);

module.exports = router;