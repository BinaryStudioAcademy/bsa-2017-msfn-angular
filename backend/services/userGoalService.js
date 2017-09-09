const ApiError = require('./apiErrorService');
const userGoalRepository = require('../repositories/userGoalRepository');
const mongoose = require('mongoose')

function UserGoalService() {}

UserGoalService.prototype.createUserGoal = createUserGoal;
UserGoalService.prototype.getUserGoalById = getUserGoalById;
UserGoalService.prototype.updateUserGoal = updateUserGoal;
UserGoalService.prototype.deleteUserGoal = deleteUserGoal;



function getUserGoalById(userId, callback) {
    userGoalRepository.findById(userId, (err, userGoalData) => {

        if (err) return callback(err);
        if (userGoalData === null) {
            callback(null, []);
        } else {
            callback(null, userGoalData);
        }
    });
}

function createUserGoal(body, callback) {
    if (body.createdByUser && body.value && body.value > 0 && body.deadline && body.type && body.startTime) {
        userGoalRepository.add(body, (err, userGoalData) => {
            if (err) return callback(err);
                if (userGoalData === null) {
                    callback(null, []);
                } else {
                    callback(null, userGoalData);
            }
        });
    } else {
        callback(new ApiError('Invalid data passed'));
    }
}


function updateUserGoal(id, body, callback) {
    if(body.createdByUser && body.value && body.value > 0 && body.deadline && body.type){
        userGoalRepository.update(id, body, (err, userGoalData) => {

            if (err) return callback(err);
            if (userGoalData === null) {
                callback(null, []);
            } else {
                callback(null, userGoalData);
            }
        });
    } else {
        callback(new ApiError('Invalid data passed'));
    }
}

function deleteUserGoal(id, userId, callback) {
    if(mongoose.Types.ObjectId.isValid(id)) {

    
    userGoalRepository.deleteById(id, userId, (err, userGoalData)=>{

        if (err) return callback(err);
        if (userGoalData === null) {
            callback(null, []);
        } else {
            callback(null, userGoalData);
        }
    });

    } else {
        callback(new ApiError('Invalid id'));
    }
}



module.exports = new UserGoalService();
