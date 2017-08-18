const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    oauthConfig = new require('../config/oauth')(),
    userService = require('../services/userService'),
    userRepository = require('../repositories/userRepository'),
    ApiError = require('../services/apiErrorService');

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
                        //Check if email already in db
                        userRepository.getUserByEmail(profile.emails[0].value, (err, user) => {
                            if (err) {
                                return done(err);
                            }
                            //no email in db -> register with google account
                            if (user === null) {
                                const userBody = {
                                    firstName: profile.name.givenName,
                                    lastName: profile.name.familyName,
                                    email: profile.emails[0].value,
                                    password: 'qwerty',
                                    isCoach: false,
                                    isAdmin: false,
                                    activateToken: '',
                                    birthday: '',
                                    googleID: profile.id
                                };
                                userRepository.add(userBody, (err, user) => {
                                    if (err) {
                                        return done(err.error);
                                    }
                                    //and login
                                    return done(null, user)
                                })
                                // if email in db -> update user
                            } else {
                                userService.updateItem(user._id, queryWithID, (err, cb) => {
                                    if (err) {
                                        return done(err);
                                    }
                                    return done(null, user);
                                });
                            }
                        });
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
                        userRepository.getUserByEmail(profile.emails[0].value, (err, user) => {
                            if (err) {
                                return done(err);
                            }
                            if (user === null) {
                                const names = profile.displayName.trim().split(/\s+/);
                                const userBody = {
                                    firstName: profile.name.givenName || names[0],
                                    lastName: profile.name.familyName || names[1],
                                    email: profile.emails[0].value,
                                    password: 'qwerty',
                                    isCoach: false,
                                    isAdmin: false,
                                    activateToken: '',
                                    birthday: '',
                                    facebookID: profile.id
                                };
                                userRepository.add(userBody, (err, user) => {
                                    if (err) {
                                        return done(err.error);
                                    }
                                    return done(null, user)
                                })
                            } else {
                                userService.updateItem(user._id, queryWithID, (err, cb) => {
                                    if (err) {
                                        return done(err);
                                    }
                                    return done(null, user);
                                });
                            }
                        });
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
                        userRepository.getUserByEmail(profile.emails[0].value, (err, user) => {
                            if (err) {
                                return done(err);
                            }
                            if (user === null) {
                                const names = profile.displayName.trim().split(/\s+/);
                                const userBody = {
                                    firstName: profile.name.givenName || names[0],
                                    lastName: profile.name.familyName || names[1],
                                    email: profile.emails[0].value || 'default@msfn.com',
                                    password: 'qwerty',
                                    isCoach: false,
                                    isAdmin: false,
                                    activateToken: '',
                                    birthday: '',
                                    twitterID: profile.id
                                };
                                userRepository.add(userBody, (err, user) => {
                                    if (err) {
                                        return done(err.error);
                                    }
                                    return done(null, user)
                                })
                            } else {
                                userService.updateItem(user._id, queryWithID, (err, cb) => {
                                    if (err) {
                                        return done(err);
                                    }
                                    return done(null, user);
                                });
                            }
                        });
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
