module.exports = {
    googleOptions: {
        clientID: '568258344186-shnqjs18j6jdudhq4jhnpal75sfdvpp5.apps.googleusercontent.com',
        clientSecret: 'TwqsDp1Sf4wNcIaqLdhJWtPH',
        callbackURL: "http://localhost:3060/auth/google/callback",
        passReqToCallback: true
    },
    facebookOptions: {
        clientID: '1492797114115423',
        clientSecret: '4853afb46acb6b1286d4ca0bdbbe49c2',
        callbackURL: "http://localhost:3060/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email'],
        passReqToCallback: true
    },
    twitterOptions: {
        consumerKey: '73eCrw6PYset3wPCsTtreVEey',
        consumerSecret: '7u8viziKxzeUlNV2BLUT0E2vptUmBYCXxjEv65k8T4Heak9Riq',
        callbackURL: "http://localhost:3060/auth/twitter/callback",
        includeEmail: true,
        passReqToCallback: true
    }
};

