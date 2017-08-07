const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    oauthConfig = require('../config/oauth'),
    userService = require('../services/userService'),
    userRepository = require('../repositories/userRepository');

module.exports = function () {
    passport.use(new GoogleStrategy(oauthConfig.googleOptions,
        (req, accessToken, refreshToken, profile, done) => {
            const queryWithID = {
                "googleID": profile.id
            };
            if (!req.user) {
                // Not logged-in. Authenticate based on Google account.
                console.log('Not logged-in');
                userRepository.getUserByQuery(queryWithID, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        //If user register already, just login
                        done(null, user)
                    } else {
                        //else register with google account
                        const userBody = {
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: profile.emails[0].value,
                            googleID: profile.id
                        };
                        userService.addItem(userBody, (err, user) => {
                            if (err) {
                                return done(err);
                            }
                            //and login
                            return done(null, user)
                        })
                    }
                });
            } else {
                //Logged in. Associate google account with user
                console.log('Loggen in');
                console.log(req.user);
                userService.updateItem(req.user._id, queryWithID, (err, cb) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null, req.user)
                })
            }
        }
    ));
    passport.use(new FacebookStrategy(oauthConfig.facebookOptions,
        (req, accessToken, refreshToken, profile, done) => {
            const queryWithID = {
                "facebookID": profile.id
            };
            if (!req.user) {
                // Not logged-in. Authenticate based on Google account.
                console.log('Not logged-in');
                userRepository.getUserByQuery(queryWithID, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        //If user register already, just login
                        done(null, user)
                    } else {
                        //else register with google account
                        const userBody = {
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: profile.emails[0].value,
                            googleID: profile.id
                        };
                        userService.addItem(userBody, (err, user) => {
                            if (err) {
                                return done(err);
                            }
                            //and login
                            return done(null, user)
                        })
                    }
                });
            } else {
                //Logged in. Associate google account with user
                console.log('Loggen in');
                console.log(req.user);
                userService.updateItem(req.user._id, queryWithID, (err, cb) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null, req.user)
                })
            }
        }
    ));
    passport.use(new TwitterStrategy(oauthConfig.twitterOptions,
        (req, token, tokenSecret, profile, done) => {
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
