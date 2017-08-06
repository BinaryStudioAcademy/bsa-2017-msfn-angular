const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    oauthConfig = require('../config/oauth'),
    userService = require('../services/userService'),
    userRepository = require('../repositories/userRepository')
;


module.exports = function () {

    passport.use(new GoogleStrategy(oauthConfig.googleOptions,
        (req, accessToken, refreshToken, profile, done) => {
        // if user logged in
        if (req.user) {
            let query = {};
            // local log in
            if (req.user.email) {
                query = {
                    'email': req.user.email
                };
            } else
                if ( req.user.facebook ) { // fb log in
                query = {
                    'facebook.id': req.user.facebook.id
                };
            } else
                if ( req.user.twitter ) { // twitter log in
                    query = {
                        'twitter.id': req.user.twitter.id
                    };
                }
            userRepository.getUserByQuery(query, (error, user) => {
                if (error) {
                    return done(error);
                }
                if (user) {
                    done(null, user)
                } else {
                    user = {};
                    user.google = {};
                    user.google.id    = profile.id;
                    user.google.token = accessToken;
                    user.google.email = profile.emails[0].value;
                    user.google.name  = profile.displayName;
                    userService.updateItem(user._id, user, (error) => {
                        if (error) {
                            throw error;
                        }
                        return done(null, user);
                    });
                }
            })
        } else {
            let query = { 'google.id': profile.id };
            process.nextTick(() => {
                userRepository.getUserByQuery(query, (error, user) => {
                    if (error) {
                        return done(error);
                    }
                    if (user) {
                        done(null, user)
                    } else {
                        user = {};
                        user.google = {};
                        user.google.id    = profile.id;
                        user.google.token = accessToken;
                        user.google.email = profile.emails[0].value;
                        user.google.name  = profile.displayName;
                        userService.addItem(user, (error) => {
                            if (error) {
                                throw error;
                            }
                            return done(null, user);
                        });
                    }
                })
            });
        }

        }
    ));
    passport.use(
        new FacebookStrategy(oauthConfig.facebookOptions,
        (req, accessToken, refreshToken, profile, done) => {
            if (req.user) {
                let query = {};
                if (req.user.email) {
                    query = {
                        'email': req.user.email
                    };
                } else
                if ( req.user.facebook ) {
                    query = {
                        'google.id': req.user.google.id
                    };
                } else
                if ( req.user.twitter ) {
                    query = {
                        'twitter.id': req.user.twitter.id
                    };
                }
                userRepository.getUserByQuery(query, (error, user) => {
                    if (error) {
                        return done(error);
                    }
                    if (user) {
                        done(null, user)
                    } else {
                        user = {};
                        user.google = {};
                        user.google.id    = profile.id;
                        user.google.token = accessToken;
                        user.google.email = profile.emails[0].value;
                        user.google.name  = profile.displayName;
                        userService.updateItem(user._id, user, (error) => {
                            if (error) {
                                throw error;
                            }
                            return done(null, user);
                        });
                    }
                })
            } else {
                let query = { 'facebook.id': profile.id };
                process.nextTick(() => {
                    userRepository.getUserByQuery(query, (error, user) => {
                        if (error) {
                            return done(error);
                        }
                        if (user) {
                            done(null, user)
                        } else {
                            user = {};
                            user.facebook.id = profile.id;
                            user.facebook.name = profile.name.givenName;
                            user.facebook.surname = profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;
                            userService.addItem(user, (error) => {
                                if (error) {
                                    throw error;
                                }
                                return done(null, user);
                            });
                        }
                    });
                });
            }
        }
        ));
    passport.use(new TwitterStrategy(oauthConfig.twitterOptions,
        (req, token, tokenSecret, profile, done) => {
            if (req.user) {
                let query = {};
                if (req.user.email) {
                    query = {
                        'email': req.user.email
                    };
                } else
                if ( req.user.facebook ) {
                    query = {
                        'google.id': req.user.google.id
                    };
                } else
                if ( req.user.twitter ) {
                    query = {
                        'facebook.id': req.user.facebook.id
                    };
                }
                userRepository.getUserByQuery(query, (error, user) => {
                    if (error) {
                        return done(error);
                    }
                    if (user) {
                        done(null, user)
                    } else {
                        user = {};
                        user.google = {};
                        user.google.id    = profile.id;
                        user.google.token = accessToken;
                        user.google.email = profile.emails[0].value;
                        user.google.name  = profile.displayName;
                        userService.updateItem(user._id, user, (error) => {
                            if (error) {
                                throw error;
                            }
                            return done(null, user);
                        });
                    }
                })
            } else {
                let query = { 'twitter.id': profile.id };
                process.nextTick(() => {
                    userRepository.getUserByQuery(query, (error, user) => {
                        if (error) {
                            return done(error);
                        }
                        if (user) {
                            done(null, user)
                        } else {
                            user = {};
                            user.twitter.id = profile.id;
                            user.twitter.username = profile.username;
                            user.twitter.displayName = profile.displayName;
                            userService.addItem(user, (error) => {
                                if (error) {
                                    throw error;
                                }
                                return done(null, user);
                            });
                        }
                    });
                });
            }
        }
    ));
};
