const passport = require('passport');

function OAuthService() {
}

OAuthService.prototype.oauthLogin = oauthLogin;

function oauthLogin(strategy, req, res, next) {
    passport.authenticate(strategy, (err, user, info) => {
        if (err) {
            return next(err);
        } else if (user) {
            req.logIn(user, err => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/user/profile/me');
            })
        } else {
            res.send(info);
        }
    })(req, res, next);
}

module.exports = new OAuthService();
