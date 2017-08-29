const Repository = require('./generalRepository'),
    UserGoal = require('../schemas/userGoalSchema');

function UserGoalRepository() {
    Repository.prototype.constructor.call(this);
    this.model = UserGoal;
}

UserGoalRepository.prototype = new Repository();

UserGoalRepository.prototype.findByUsername = findByUsername;
UserGoalRepository.prototype.deleteById = deleteById;

function findByUsername(username, callback) {
    const query = this.model.find({
        $and: [{
                createdByUser: username
            },
            {
                isRemoved: false
            }
        ]
    });
    query.exec(callback);
};

function deleteById(id, username, callback) {
    console.log(id, username);
    const query = this.model.update({
        $and: [{
                createdByUser: username
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
