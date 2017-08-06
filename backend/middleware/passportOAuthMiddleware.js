const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    oauthConfig = require('../config/oauth'),
    userService = require('../services/userService');

module.exports = function () {
    passport.use(new GoogleStrategy(oauthConfig.googleOptions,
        function (accessToken, refreshToken, profile, done) {
            const userBody = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
            };
            userService.addItem(userBody, (err, user) => {
                if (err) {
                    //якщо юзер вже зареєстрований, то просто логінимо його
                    if (err.message.error === "User with such email already exists") {
                        return done(null, true);
                    }
                    //інакше повертаємо помилку
                    return done(err)
                }
                //якщо не зареєстований і додався в базу то теж логінимо його
                return done(null, true);
            });
        }
    ));
    passport.use(new FacebookStrategy(oauthConfig.facebookOptions,
        function (accessToken, refreshToken, profile, done) {
            const userBody = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
            };
            userService.addItem(userBody, (err, user) => {
                if (err) {
                    //якщо юзер вже зареєстрований, то просто логінимо його
                    if (err.message.error === "User with such email already exists") {
                        return done(null, true);
                    }
                    //інакше повертаємо помилку
                    return done(err)
                }
                //якщо не зареєстований і додався в базу то теж логінимо його
                return done(null, true);
            });
        }
    ));
    passport.use(new TwitterStrategy(oauthConfig.twitterOptions,
        function (token, tokenSecret, profile, done) {
            const userBody = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
            };
            userService.addItem(userBody, (err, user) => {
                if (err) {
                    //якщо юзер вже зареєстрований, то просто логінимо його
                    if (err.message.error === "User with such email already exists") {
                        return done(null, true);
                    }
                    //інакше повертаємо помилку
                    return done(err)
                }
                //якщо не зареєстований і додався в базу то теж логінимо його
                return done(null, true);
            });
        }
    ));
};
