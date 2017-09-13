const Repository = require('./generalRepository'),
    FoodPlan = require('../schemas/foodPlanSchema');

function FoodPlanRepository() {
    Repository.prototype.constructor.call(this);
    this.model = FoodPlan;
}

FoodPlanRepository.prototype = new Repository();

module.exports = new FoodPlanRepository();
