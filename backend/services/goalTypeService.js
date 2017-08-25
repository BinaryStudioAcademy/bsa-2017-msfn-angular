const ApiError = require('./apiErrorService');
const goalTypeRepository = require('../repositories/goalTypeRepository');
const mongoose = require('mongoose')

function GoalTypeService() {}

GoalTypeService.prototype.getGoalTypeByName = getGoalTypeByName;
GoalTypeService.prototype.addGoalType = addGoalType;
GoalTypeService.prototype.deleteGoalType = deleteGoalType;
GoalTypeService.prototype.getGoals = getGoals;



function getGoalTypeByName(name, callback) {
    const nameRegExp = new RegExp('^' + name + '$', 'i');
    goalTypeRepository.findByName(nameRegExp, (err, goalTypeData) => {

        if (err) return callback(err);
        if (goalTypeData === null) {
            callback(null, []);
        } else {
            callback(null, goalTypeData);
        }
    });
}

function addGoalType(name, callback) {

        this.getGoalTypeByName(name, (err, data) => {
        
        if (data.name) {
            callback(new ApiError('This goal name already exists'));
        } else {
            goalTypeRepository.add({name: name}, (err, goalTypeData) => {

                if (err) return callback(err);
                if (goalTypeData === null) {
                    callback(null, []);
                } else {
                    callback(null, goalTypeData);
                }
            });
        }
    });
}



function deleteGoalType(name, callback) {
    goalTypeRepository.deleteByName(name, (err, goalTypeData)=>{
        if (err) return callback(err);
        if (goalTypeData === null) {
            callback(null, []);
        } else {
            callback(null, goalTypeData);
        }
    });
}


function getGoals(callback) {
    goalTypeRepository.getAll((err, goalTypesData) => {
        if (err) return callback(err);
        if (goalTypesData === null) {
            callback(null, []);
        } else {
            callback(null, goalTypesData);
        }
    });
}


module.exports = new GoalTypeService();
