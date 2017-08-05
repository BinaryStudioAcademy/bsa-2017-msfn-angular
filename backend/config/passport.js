const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy;
module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user); // объект юзера в сессию
    });

    passport.deserializeUser(function (user, done) {
        done(null, user); // из сессии в объект юзера
    });

    passport.use(new GoogleStrategy({
            clientID: '568258344186-shnqjs18j6jdudhq4jhnpal75sfdvpp5.apps.googleusercontent.com',
            clientSecret: 'TwqsDp1Sf4wNcIaqLdhJWtPH',
            callbackURL: "http://localhost:3060/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile.displayName);
            console.log(profile.emails[0].value);
            return done(null, profile);
        }
    ));

    passport.use(new FacebookStrategy({
            clientID: '1492797114115423',
            clientSecret: '4853afb46acb6b1286d4ca0bdbbe49c2',
            callbackURL: "http://localhost:3060/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile.displayName);
            console.log(profile.emails[0].value);
            return done(null, profile);
        }
    ));

    passport.use(new TwitterStrategy({
            consumerKey: '73eCrw6PYset3wPCsTtreVEey',
            consumerSecret: '7u8viziKxzeUlNV2BLUT0E2vptUmBYCXxjEv65k8T4Heak9Riq',
            callbackURL: "http://localhost:3060/auth/twitter/callback",
            includeEmail: true
        },
        function (token, tokenSecret, profile, done) {
            console.log(profile.displayName);
            console.log(profile.emails[0].value);
            return done(null, profile);
        }
    ));
};
