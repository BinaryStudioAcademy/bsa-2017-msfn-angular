const Repository = require('./generalRepository'),
    TrainingPlan = require('../schemas/trainingPlanSchema');

function TrainingPlanRepository() {
    Repository.prototype.constructor.call(this);
    this.model = TrainingPlan;
}

TrainingPlanRepository.prototype = new Repository();

TrainingPlanRepository.prototype.Search = function (filter, callback) {
    let model = this.model;

    let searchString = filter.search;
    delete filter.search;

    if (filter.userID && filter.userID['$in']) {
        filter.userID['$in'].forEach((item, index) => {
            filter.userID['$in'][index] = this.makeObjectId(item);
        });
    }

    const match = {
        $and: [
            {'isRemoved': false},
            {'shared': true},
            filter,
            {
                $or: [
                    {'user.firstName': new RegExp(searchString, 'i')},
                    {'user.lastName': new RegExp(searchString, 'i')},
                    {'name': new RegExp(searchString, 'i')}
                ]
            }
        ]
    };

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
            {
                $match: match
            }
        ]
    ).exec(callback);
};

module.exports = new TrainingPlanRepository();
