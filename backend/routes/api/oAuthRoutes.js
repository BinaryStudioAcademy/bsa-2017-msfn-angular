const passport = require('passport'),
    oauthService = require('../../services/oauthService');

module.exports = function(app) {

    //google
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/userinfo.email']
        })
    );
    app.get('/auth/google/callback',
        function(req, res, next) {
            oauthService.oauthLogin('google', req, res, next)
        });

    //facebook
    app.get('/auth/facebook',
        passport.authenticate('facebook', {
            scope: ['email', 'public_profile']
        })
    );
    app.get('/auth/facebook/callback',
        function(req, res, next) {
            oauthService.oauthLogin('facebook', req, res, next)
        });

    //twitter
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback',
        function(req, res, next) {
            oauthService.oauthLogin('twitter', req, res, next)
        });
};
