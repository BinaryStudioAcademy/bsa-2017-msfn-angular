module.exports = function (app) {
    return {
       userRoutes: require('./userRoutes')(app),
       //loginRoutes: require('./loginRoutes')(app),
       //logoutRoutes: require('./logoutRoutes')(app)
    };
};
