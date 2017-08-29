const baseUrl = '/api/load/',
    apiResponse = require('express-api-response'),
    loadTypes = require('./loadTypesRoutes'),
    loadExercises = require('./loadExercisesRoutes');

module.exports = function (app) {
    app.use(baseUrl, loadTypes);
    app.use(baseUrl, loadExercises);
}