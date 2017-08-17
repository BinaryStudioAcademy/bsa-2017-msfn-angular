const passport = require('passport'),
      decrypt = require('./decryptService'),
      profilePath = '/profile';

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

function loginConfirmedUser(req, res, next) {
    console.log(req.body);
    req.body = {
        email: 'shouldactivate',
        password: req.params.token
    };
    console.log(req.body);
    passport.authenticate('local',
        function(err, user, info) {
            console.log("err: ");
            console.log(err);
            console.log('user');
            console.log(user);
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
