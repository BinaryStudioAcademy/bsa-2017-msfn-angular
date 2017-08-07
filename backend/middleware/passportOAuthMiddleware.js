const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    oauthConfig = require('../config/oauth'),
    userService = require('../services/userService'),
    userRepository = require('../repositories/userRepository');

module.exports = function() {
    passport.use(new GoogleStrategy(oauthConfig.googleOptions,
        (req, accessToken, refreshToken, profile, done) => {
            const queryWithID = {
                "googleID": profile.id
            };
            if (!req.user) {
                // Not logged-in. Authenticate based on Google account.
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
                userRepository.getUserByQuery(queryWithID, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        done(null, user)
                    } else {
                        const userBody = {
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: profile.emails[0].value,
                            facebookID: profile.id
                        };
                        userService.addItem(userBody, (err, user) => {
                            if (err) {
                                return done(err);
                            }
                            return done(null, user)
                        })
                    }
                });
            } else {
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
        (req, accessToken, refreshToken, profile, done) => {
            const queryWithID = {
                "twitterID": profile.id
            };
            if (!req.user) {
                userRepository.getUserByQuery(queryWithID, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        done(null, user)
                    } else {
                        const userBody = {
                            firstName: profile.displayName,
                            email: profile.emails[0].value,
                            twitterID: profile.id
                        };
                        userService.addItem(userBody, (err, user) => {
                            if (err) {
                                return done(err);
                            }
                            return done(null, user)
                        })
                    }
                });
            } else {
                userService.updateItem(req.user._id, queryWithID, (err, cb) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null, req.user)
                })
            }
        }
    ));
};
