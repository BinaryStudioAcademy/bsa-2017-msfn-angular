const
apiResponse = require('express-api-response'),
usersGoalService = require('../../services/usersGoalService'),
userRepository = require('../../repositories/userRepository'),
// loginService = require('../../services/loginService'),

express = require('express'),
router = express.Router();

router.get('/all', function (req, res, next) {
    console.log('g');
    usersGoalService.getAllItems(req, (err, data) => {
        console.log(data);
        res.data = data;
        res.err = err;
        next();
    });
    // loginService.loginConfirmedUser(req, res, next, function (err, user) {
    //     res.data = data;
    //     res.err = err;
    //     next();
    // });
}, apiResponse);

router.post('', function (req, res, next) {
    // console.log('router');
    // console.log(req);
    usersGoalService.addItem(req, (err, data) => {
        console.log(data);
        res.data = {
            status: 'ok',
        };
        res.err = err;
        next();
    });
}, apiResponse);

router.delete('/:id', function (req, res, next) {
    usersGoalService.deleteItem(req.params.id, function (err, data) {
        res.data = data;
        res.err = err;
        next();
    });
}, apiResponse);


module.exports = router;