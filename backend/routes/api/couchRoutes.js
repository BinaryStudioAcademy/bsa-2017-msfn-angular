const
    apiResponse = require('express-api-response'),
    coachService = require('../../services/coachService'),
    baseUrl = '/api/coach/';

module.exports = app => {

    app.put(baseUrl + 'apply', (req, res, next) => {
        coachService.apply(req.user._id, req.body, (err, data) => {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

};
