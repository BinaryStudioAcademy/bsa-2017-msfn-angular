const Repository = require('./generalRepository'),
        User = require('../schemas/userSchema');
        mongoose = require('mongoose');
        Schema = mongoose.Schema;

function UserRepository() {
    Repository.prototype.constructor.call(this);
    this.model = User;
}

UserRepository.prototype = new Repository();

UserRepository.prototype.getUserByEmail = getUserByEmail;
UserRepository.prototype.findById = findById;
UserRepository.prototype.getUserByQuery = getUserByQuery;
UserRepository.prototype.getUserByToken = getUserByToken;
UserRepository.prototype.addEmail = addEmail;
UserRepository.prototype.processRequest = processRequest;
UserRepository.prototype.getUsersFromArrayID = getUsersFromArrayID;
UserRepository.prototype.addGoal = addGoal;
UserRepository.prototype.deleteGoal = deleteGoal;
UserRepository.prototype.getAllGoals = getAllGoals;

function getUserByEmail(email, callback) {
    const query = this.model.findOne({email : email});
    query.exec(callback);
}

function getUserByToken(token, callback) {
    const query = this.model.findOne({activateToken : token});
    query.exec(callback);
}


function findById(id, callback) {
    const query = this.model.findOne({_id : id});
    query.exec(callback);
}
function getUserByQuery(queryObj, callback) {
    const query = this.model.findOne(queryObj);
    query.exec(callback);
}

function addEmail(id, email, callback) {
    const query = this
        .model
        .update({
            _id: id
        }, {
            $addToSet: {
                secondaryEmails: email
            }
        });
    query.exec(callback);
}

function processRequest(id, body, callback) {
    const removeRequestQuery = this.model.update(
        {
            _id: id
        }, {
            $unset: {
                requestForCoaching: false
            }
        });
    removeRequestQuery.exec(callback);

    if (body.isCoach) {
        const makeCoachQuery = this.model.update(
            {
                _id: id
            }, {
                $set: {
                    isCoach: body.isCoach
                }
            }
        );
        makeCoachQuery.exec(callback);
    }
}

function getUsersFromArrayID(array, params, callback) {
    if (params.fields === undefined) {
        params.fields = null;
    }
    const query = this.model.find().where('_id').in(array).select(params.fields);
    query.exec(callback);
}

function addGoal(id, goal, callback) {
    console.log('in update');
    const query = this
    .model
    .update({
        _id: id
    }, {
        $push: {
            goals: goal
        }
    });
    query.exec(callback);
}

function deleteGoal(id, callback) {
    console.log(id);
    console.log('in update');
    const query = this
    .model
    .update({
        'goals._id': mongoose.Types.ObjectId(id)
    }, {
        $set: {
            'goals.$.isRemoved': true
        }
    });
    query.exec(callback);
}

function getAllGoals(id, callback) {
    const query = this.model.findOne(
        {
            _id: id
        }, {
            'goals': 1
        }
    );
    query.exec(callback);
}

module.exports = new UserRepository();
