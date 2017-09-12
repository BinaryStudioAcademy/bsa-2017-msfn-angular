const Repository = require('./generalRepository'),
    Achievements = require('../schemas/achievementsSchema');

function AchievementsRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Achievements;
}

AchievementsRepository.prototype = new Repository();

module.exports = new AchievementsRepository();
