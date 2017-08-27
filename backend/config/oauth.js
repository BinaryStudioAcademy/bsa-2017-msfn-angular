module.exports = function () {
    const config = require('../config');
    return {
        googleOptions: {
            clientID: '441040615156-prik3p2h0di25sogmuprrkbfdp0t03ng.apps.googleusercontent.com',
            clientSecret: 'n0-6RRebaIH0q0vjVIfXnp1T',
            callbackURL: config.host.hostAddress + '/auth/google/callback',
            passReqToCallback: true
        },
        facebookOptions: {
            clientID: '1626820387370595',
            clientSecret: '20cd2cca725fb4c577d8a1c6db49a62c',
            accessToken: '1492797114115423|JQrFtHMVEKGt2DLNjo_v7peh--g',
            callbackURL: config.host.hostAddress + '/auth/facebook/callback',
            profileFields: [
                'id', 'displayName', 'photos', 'email'
            ],
            passReqToCallback: true
        },
        twitterOptions: {
            consumerKey: 'J563BzDspgMDXASaee0qC2CK4',
            consumerSecret: '0Jco5MCOBbiahaNwsrOcMgwR7w9qqI0JoBEfPrH80bp5jQmPnn',
            accessToken: '310721290-GfIIq6iwuE3J929z2l1pwciYDQspRTIJLlrH1WoW',
            callbackURL: config.host.hostAddress + '/auth/twitter/callback',
            includeEmail: true,
            passReqToCallback: true
        }
    };
}

