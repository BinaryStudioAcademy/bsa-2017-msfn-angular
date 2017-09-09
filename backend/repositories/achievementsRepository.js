const Repository = require('./generalRepository'),
    Achievements = require('../schemas/AchievementsSchema');

function AchievementsRepository() {
    Repository.prototype.constructor.call(this);
    AchievementsRepository.prototype.addAchievement = addAchievement;
    this.model = Achievements;

    function addAchievement(data, callback) {
        const model = this.model;
        const newItem = new model(data);
        newItem.save(callback);
    }
}
module.exports = new AchievementsRepository();
