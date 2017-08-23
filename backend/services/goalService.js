const ApiError = require('./apiErrorService');
const goalRepository = require('../repositories/goalRepository');
const mongoose = require('mongoose')

function GoalService() {}

GoalService.prototype.createGoal = createGoal;
GoalService.prototype.getGoalByName = getGoalByName;
GoalService.prototype.getGoals = getGoals;
GoalService.prototype.updateGoal = updateGoal;
GoalService.prototype.deleteGoal = deleteGoal;



function getGoalByName(name, callback) {
    const nameRegExp = new RegExp('^' + name + '$', 'i');
    goalRepository.findByName(nameRegExp, (err, goalData) => {

        if (err) return callback(err);
        if (goalData === null) {
            callback(null, []);
        } else {
            callback(null, goalData);
        }
    });
}

function createGoal(body, callback) {

        this.getGoalByName(body.name, (err, data) => {
        
        if (data.name) {
            callback(new ApiError('This goal name already exists'));
        } else {
            goalRepository.add(body, (err, goalData) => {

                if (err) return callback(err);
                if (goalData === null) {
                    callback(null, []);
                } else {
                    callback(null, goalData);
                }
            });
        }
    });
}


function updateGoal(id, body, callback) {
    this.getGoalByName(body.name, (err, data) => {
        console.log(body, data._id, id);
        if (data.name && data._id != id) {
            callback(new ApiError('This goal name already exists'));
        } else {
            
            goalRepository.updateById(id, body, (err, goalData) => {

                if (err) return callback(err);
                if (goalData === null) {
                    callback(null, []);
                } else {
                    callback(null, goalData);
                }
            });

        }
    });
}

function deleteGoal(id, callback) {
    if(mongoose.Types.ObjectId.isValid(id)) {

    
    goalRepository.deleteById(id, (err, goalData)=>{

        if (err) return callback(err);
        if (goalData === null) {
            callback(null, []);
        } else {
            callback(null, goalData);
        }
    });

    } else{
            callback(new ApiError('Invalid id'));
    }
}


function getGoals(callback) {
    goalRepository.getAll((err, goalsData) => {
        if (err) return callback(err);
        if (goalsData === null) {
            callback(null, []);
        } else {
            callback(null, goalsData);
        }
    });
}


module.exports = new GoalService();
