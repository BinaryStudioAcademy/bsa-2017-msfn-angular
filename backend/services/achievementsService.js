const ApiError = require('./apiErrorService');
const achievementsRepository = require('../repositories/achievementsRepository');

function AchievementsService() {}

AchievementsService.prototype.getAllAchievements = getAllAchievements;
AchievementsService.prototype.getAchievement = getAchievement;


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