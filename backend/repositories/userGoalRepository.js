const Repository = require('./generalRepository'),
    UserGoal = require('../schemas/userGoalSchema');

function UserGoalRepository() {
    Repository.prototype.constructor.call(this);
    this.model = UserGoal;
}

UserGoalRepository.prototype = new Repository();

UserGoalRepository.prototype.findById = findById;
UserGoalRepository.prototype.deleteById = deleteById;

function findById(userId, callback) {
    const query = this.model.find({
        $and: [{
                createdByUser: userId
            },
            {
                isRemoved: false
            }
        ]
    });
    query.exec(callback);
};

function deleteById(id, userId, callback) {
    const query = this.model.update({
        $and: [{
                createdByUser: userId
            },
            {
                _id: id,
            }
        ]
    },  {
        $set: {
            isRemoved: true
        }
    });
    query.exec(callback);
};


module.exports = new UserGoalRepository();
