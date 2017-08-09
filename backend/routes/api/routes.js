module.exports = function (app) {
    return {
        userRoutes: require('./userRoutes')(app),
        oAuthRoutes: require('./oAuthRoutes')(app),
        passRoutes: require('./passwordRoutes')(app),
        exerciseTypeRoutes: require('./exerciseTypeRoutes')(app)
    };
};
