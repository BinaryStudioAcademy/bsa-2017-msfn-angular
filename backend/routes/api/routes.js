module.exports = function (app) {
    return {
       userRoutes: require('./userRoutes')(app),
       passRoutes: require('./passwordRoutes')(app)
    };
};
