const apiResponse = require('express-api-response');
const passport = require('passport');
module.exports = function (app) {
    const redirect = {
        successRedirect: '/', //must change to user profile route
        failureRedirect: '/login'
    };

    //google
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/userinfo.email']
        })
    );
    app.get('/auth/google/callback',
        passport.authenticate('google', redirect)
    );

    //facebook
    app.get('/auth/facebook',
        passport.authenticate('facebook', {
            scope: ['email', 'public_profile']
        })
    );
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', redirect)
    );

    //twitter
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', redirect));

};
