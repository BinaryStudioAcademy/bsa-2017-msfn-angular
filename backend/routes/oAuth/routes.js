module.exports = function(app) {
	return {
		commonRoutes: require('./oAuthRoutes')(app)
	};
};
