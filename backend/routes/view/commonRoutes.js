const injectData = require('../../middleware/injectedDataMiddleware');
const apiResponse = require('express-api-response');

module.exports = function(app) {
	app.get('*', function(req, res, next) {
		injectData(req, res, {}, false);
	});

	app.get('/test/', function(req, res, next) {
		res.data = {message: 'WORKS!'};
		res.err = null;
		next();
	}, apiResponse);
};
