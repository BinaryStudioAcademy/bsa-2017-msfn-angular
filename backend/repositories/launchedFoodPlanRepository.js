const Repository = require('./generalRepository'),
    LaunchedFoodPlan = require('../schemas/launchedFoodPlanSchema');

function LaunchedFoodPlanRepository() {
    Repository.prototype.constructor.call(this);
    this.model = LaunchedFoodPlan;
}

LaunchedFoodPlanRepository.prototype = new Repository();
LaunchedFoodPlanRepository.prototype.getLaunchedFoodPlanByUserId = getLaunchedFoodPlanByUserId;

function getLaunchedFoodPlanByUserId(id, callback) {
    const query = this.model.find({
        userID: id
    });
    query.exec(callback);
};

module.exports = new LaunchedFoodPlanRepository();
