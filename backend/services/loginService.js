const passport = require('passport'),
    userService = require('./userService'),
    decrypt = require('./decryptService');

function LoginService() {

};

LoginService.prototype.login = login;
LoginService.prototype.loginConfirmedUser = loginConfirmedUser;

function login(req, res, next) {
    req.body = decrypt(req.body.data);
    passport.authenticate('local',
        function(err, user, info) {
            if (err) {
                return next(err)
            } else if (user) {
                if (user.activateToken) {
                    return res.send({access: false})
                }

                return req.logIn(user, function(err) {
                    if (err) {
                        return next(err)
                    } else {
                        console.log(Math.floor((new Date() - new Date(user.lastActivityDate))/(24*60*60*1000)));
                        const data = {
                            lastActivityDate: new Date().toISOString(),
                            comboCount: (user.lastActivityDate && Math.floor((new Date() - new Date(user.lastActivityDate))/(24*60*60*1000)) === 1) ? (Math.floor((new Date() - new Date(user.lastActivityDate))/(24*60*60*1000)) === 0) ? 0 : user.comboCount : ++user.comboCount
                        }
                        userService.updateItem(user.id, data, () => {
                            res.send({access: true});
                        })
                    }
                })
            } else {
                res.status(401)
                res.send(info.message);
            }
        }
    )(req, res, next);
};

function loginConfirmedUser(req, res, next) {
    req.body = {
        email: 'shouldactivate',
        password: req.params.token
    };
    passport.authenticate('local',
        function(err, user, info) {
            if (err) {
                return next(err)
            } else if (user) {
                return req.logIn(user, function(err) {
                    if (err) {
                        return next(err)
                    } else {
                        return res.send({access: true});
                    }
                })
            } else {
                res.status(401)
                res.send(info.message);
            }
        }
    )(req, res, next);
};

module.exports = new LoginService()
