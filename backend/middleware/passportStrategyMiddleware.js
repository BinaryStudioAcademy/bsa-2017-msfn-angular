(function() {
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        mongoose = require('mongoose'),
        userRepository = require('../repositories/userRepository')

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done) {
            userRepository.getUserByEmail(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect email' });
                }
                if (!(user.checkPassword(password))) {
                    return done(null, false, { message: 'Incorrect password' });
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        userRepository.findById(id, function(err, user) {
            done(err, user);
        });
    });
})()

exports.isLogged = function (req, res, next){
    console.log(req.isAuthenticated())
    req.isAuthenticated()? next(): res.redirect('/');
};
