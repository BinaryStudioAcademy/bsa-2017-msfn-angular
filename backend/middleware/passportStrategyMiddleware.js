const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    userRepository = require('../repositories/userRepository');

function PassportStrategy() {

}

PassportStrategy.prototype.strategy = strategy;
PassportStrategy.prototype.isLogged = isLogged;

function strategy() {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (username, password, done) {
            userRepository.getUserByEmail(username, function (err, user) {
                if (err) {
                    return done(err);}
                if (!user) {
                    return done(null, false, {message: 'Incorrect email'});
                }
                user.checkPassword(password, (err, result) => {
                    if (err) {return done(err);}
                    if (!result) {
                        return done(null, false, {message: 'Incorrect password'});
                    } else {
                        return done(null, user);
                    }
                })

            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        userRepository.findById(id, function (err, user) {
            done(err, user);
        });
    });
};

function isLogged(req, res, next) {
    req.isAuthenticated() ? next() : res.redirect('/');
};

module.exports = new PassportStrategy;
