(function() {
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        mongoose = require('mongoose'),
        User = require('../schemas/userSchema')

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done) {
            User.findOne({ email: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect email' });
                }
                if ((user.password !== password)) {
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
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
})()

exports.isLogged = function (req, res, next){
    console.log(req.isAuthenticated())
    req.isAuthenticated()? next(): res.redirect('/');
};