const
apiResponse = require('express-api-response'),
usersGoalService = require('../../services/usersGoalService'),
// loginService = require('../../services/loginService'),

express = require('express'),
router = express.Router();

// router.get('/:token', function (req, res, next) {
//     loginService.loginConfirmedUser(req, res, next, function (err, user) {
//         res.data = data;
//         res.err = err;
//         next();
//     });
// }, apiResponse);

router.post('', function (req, res, next) {
    // console.log('router');
    // console.log(req);
    usersGoalService.addItem(req, (err, data) => {
        // res.data = {test: 'test'};
        // res.err = err;
        // next();
    });
}, apiResponse);

// router.post('/changemail', function (req, res, next) {
// activateService.genNewRootMail(req.body, function (err, data) {
//     res.data = data;
//     res.err = err;
//     next();
// });
// }, apiResponse);

// router.get('/changemail/:code', function (req, res, next) {
// activateService.checkNewRootMail(req.params.code, function (err, data) {
//     res.data = data;
//     res.err = err;
//     next();
// });
// }, apiResponse);


module.exports = router;