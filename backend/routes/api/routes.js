module.exports = function (app) {
    return {
        userRoutes: require('./userRoutes')(app),
        loginRoutes: require('./loginRoutes')(app),
        logoutRoutes: require('./logoutRoutes')(app),
        oAuthRoutes: require('./oAuthRoutes')(app),
        passRoutes: require('./passwordRoutes')(app),
        exerciseTypeRoutes: require('./exerciseTypeRoutes')(app),
        couchRoutes: require('./couchRoutes')(app),
        sportRoutes: require('./sportRoutes')(app),
        fileRoutes: require('./fileRoutes')(app),
        exerciseRoutes: require('./exerciseRoutes')(app),
        changePasswordRoutes: require('./changePasswordRoutes')(app),
        measurementRoutes: require('./measurementRoutes')(app),
        weightControlRoutes: require('./weightControlRoutes')(app),
    };
};
