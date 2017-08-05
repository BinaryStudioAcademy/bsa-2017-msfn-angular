const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    oauthConfig = require('../config/oauth'),
    userService = require('../services/userService');

module.exports = function () {
    passport.use(new GoogleStrategy(oauthConfig.googleOptions,
        function (accessToken, refreshToken, profile, done) {
            console.log(profile.displayName);
            console.log(profile.emails[0].value);
            //userService.addItem()
            return done(null, profile);
        }
    ));
    passport.use(new FacebookStrategy(oauthConfig.facebookOptions,
        function (accessToken, refreshToken, profile, done) {
            console.log(profile.displayName);
            console.log(profile.emails[0].value);
            //userService.addItem()
            return done(null, profile);
        }
    ));
    passport.use(new TwitterStrategy(oauthConfig.twitterOptions,
        function (token, tokenSecret, profile, done) {
            console.log(profile.displayName);
            console.log(profile.emails[0].value);
            //userService.addItem()
            return done(null, profile);
        }
    ));
};
