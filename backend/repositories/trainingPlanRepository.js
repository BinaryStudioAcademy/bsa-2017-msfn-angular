const Repository = require('./generalRepository'),
    TrainingPlan = require('../schemas/trainingPlanSchema');

function TrainingPlanRepository() {
    Repository.prototype.constructor.call(this);
    this.model = TrainingPlan;
}

TrainingPlanRepository.prototype = new Repository();

module.exports = new TrainingPlanRepository();
