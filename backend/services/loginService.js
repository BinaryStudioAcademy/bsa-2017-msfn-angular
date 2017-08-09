const passport = require('passport'),
      decrypt = require('./decryptService'),
      profilePath = '/profile';

function LoginService() {

};

LoginService.prototype.login = login;

function login(req, res, next) {
    req.body = decrypt(req.body.data)
    passport.authenticate('local',
        function(err, user, info) {
            if (err) {
                return next(err)
            } else if (user) {
                return req.logIn(user, function(err) {
                    if (err) {
                        return next(err)
                    } else {
                        res.status(302)
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
