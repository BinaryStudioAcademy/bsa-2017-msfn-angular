const Repository = require('./generalRepository'),
    Achievements = require('../schemas/achievementsSchema');

function AchievementsRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Achievements;
}

AchievementsRepository.prototype = new Repository();
AchievementsRepository.prototype.getAllAchievements = getAllAchievements;

function getAllAchievements(callback) {
    const query = this.model.find().sort( { icon: 1 } );
    query.exec(callback);
}

module.exports = new AchievementsRepository();
