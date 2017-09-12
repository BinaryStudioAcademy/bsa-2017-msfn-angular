const ApiError = require('./apiErrorService');
const achievementsRepository = require('../repositories/achievementsRepository');
const userRepository = require('../repositories/userRepository');

function AchievementsService() {}

AchievementsService.prototype.getAllAchievements = getAllAchievements;
AchievementsService.prototype.getAchievement = getAchievement;
AchievementsService.prototype.getUserAchievements = getUserAchievements;
AchievementsService.prototype.addUserAchievement = addUserAchievement;

function getAllAchievements(callback) {
    achievementsRepository.getAll((err, data) => {
        if (err) {
            return err;
        }
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    })
}


function getUserAchievements(id, callback) {
    userRepository.findById(id, (err, data) => {
        if (err) {
            return err;
        }
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data.achievements);
        }
    })
}

function addUserAchievement(id, body, callback) {
    userRepository.addAchievementByUserId(id, body, (err, data) => {
        if (err) {
            return err;
        }
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    })
}

function getAchievement(id,callback) {
    achievementsRepository.getById(id, (err, data) => {
        if (err) {
            return err;
        }
        if (data === null) {
            callback(null, []);
        } else {
            callback(null, data);
        }
    })
}

module.exports = new AchievementsService();