module.exports = function (app) {
    return {
        userRoutes: require('./userRoutes')(app),
        oAuthRoutes: require('./oAuthRoutes')(app),
        passRoutes: require('./passwordRoutes')(app)
    };
};
