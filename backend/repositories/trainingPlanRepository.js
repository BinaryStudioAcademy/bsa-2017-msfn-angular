const Repository = require('./generalRepository'),
    TrainingPlan = require('../schemas/trainingPlanSchema');

function TrainingPlanRepository() {
    Repository.prototype.constructor.call(this);
    this.model = TrainingPlan;
}

TrainingPlanRepository.prototype = new Repository();

TrainingPlanRepository.prototype.Search = function (searchString, callback) {
    let model = this.model;

    this.model.aggregate(
        [
            {
                $lookup: {
                    from: 'users',
                    localField: 'userID',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            // {
            //     $match: {
            //         'name':searchString
            //         'user.firstName': searchString,
            //     }
            // }
        ]
    ).exec(callback);
};

module.exports = new TrainingPlanRepository();
