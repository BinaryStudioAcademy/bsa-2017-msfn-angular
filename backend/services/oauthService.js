const passport = require('passport'),
    request = require('request');

function OAuthService() {
}

OAuthService.prototype.oauthLogin = oauthLogin;
OAuthService.prototype.oauthUnlinkGoogle = oauthUnlinkGoogle;
OAuthService.prototype.oauthUnlinkFb = oauthUnlinkFb;

function oauthLogin(strategy, req, res, next) {
    passport.authenticate(strategy, (err, user, info) => {
        if (err) {
            return next(err);
        } else if (user) {
            req.logIn(user, err => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/user');
            })
        } else {
            res.send(info);
        }
    })(req, res, next);
}

function oauthUnlinkGoogle(token, cb) {
    request('https://accounts.google.com/o/oauth2/revoke?token=' + token, (err, res, body) => {
        cb(err, res);
    })
}

function oauthUnlinkFb(id, accessToken, cb) {
    request.del('https://graph.facebook.com/' + id + '/permissions?access_token=' + accessToken, (err, res, body) => {
        cb(err, res);
    })

}

module.exports = new OAuthService();
