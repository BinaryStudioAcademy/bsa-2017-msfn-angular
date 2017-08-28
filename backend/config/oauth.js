module.exports = function () {
    const config = require('../config');
    return {
        googleOptions: {
            clientID: '83981840514-r86m39o3uimhacsgcug75b08s48necae.apps.googleusercontent.com',
            clientSecret: '2ut7kPXMA8U59NMr5RIqAv8A',
            callbackURL: config.host.hostAddress + '/auth/google/callback',
            passReqToCallback: true
        },
        facebookOptions: {
            clientID: '1326784904113778',
            clientSecret: 'c8ad6aad932eb303703c87e806b83c7c',
            accessToken: '1326784904113778|92zGwu5MGjB4zf6xLCR0-OSfckU',
            callbackURL: config.host.hostAddress + '/auth/facebook/callback',
            profileFields: [
                'id', 'displayName', 'photos', 'email'
            ],
            passReqToCallback: true
        },
        twitterOptions: {
            consumerKey: 'TibDpakOasEdOni0YBtV5jvfp',
            consumerSecret: 'Fl97g8Y14XyJ7oJTXeb3fUTqn0kS6SLjE3TeUOz5P29xA3yK0k',
            accessToken: '902256293670477826-KkskFTh3ck9DWtQQM8sQ6ixpORm8jxH',
            callbackURL: config.host.hostAddress + '/auth/twitter/callback',
            includeEmail: true,
            passReqToCallback: true
        }
    };
}
