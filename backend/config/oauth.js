module.exports = function () {
    const config = require('../config');
    return {
        googleOptions: {
            clientID: '568258344186-shnqjs18j6jdudhq4jhnpal75sfdvpp5.apps.googleusercontent.com',
            clientSecret: 'TwqsDp1Sf4wNcIaqLdhJWtPH',
            callbackURL: config.host.hostAddress + '/auth/google/callback',
            passReqToCallback: true
        },
        facebookOptions: {
            clientID: '1492797114115423',
            clientSecret: '4853afb46acb6b1286d4ca0bdbbe49c2',
            accessToken: '1492797114115423|JQrFtHMVEKGt2DLNjo_v7peh--g',
            callbackURL: config.host.hostAddress + '/auth/facebook/callback',
            profileFields: [
                'id', 'displayName', 'photos', 'email'
            ],
            passReqToCallback: true
        },
        twitterOptions: {
            consumerKey: '73eCrw6PYset3wPCsTtreVEey',
            consumerSecret: '7u8viziKxzeUlNV2BLUT0E2vptUmBYCXxjEv65k8T4Heak9Riq',
            accessToken: '310721290-GfIIq6iwuE3J929z2l1pwciYDQspRTIJLlrH1WoW',
            callbackURL: config.host.hostAddress + '/auth/twitter/callback',
            includeEmail: true,
            passReqToCallback: true
        }
    };
}
