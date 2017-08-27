const Repository = require('./generalRepository'),
    TrainingPlan = require('../schemas/trainingPlanSchema');

function TrainingPlanRepository() {
    Repository.prototype.constructor.call(this);
    this.model = TrainingPlan;
}

TrainingPlanRepository.prototype = new Repository();
TrainingPlanRepository.prototype.get = get;

function get(callback) {
    const query = this.model.find({}).populate('type', 'name')
    query.exec(callback);
};

module.exports = new TrainingPlanRepository();
