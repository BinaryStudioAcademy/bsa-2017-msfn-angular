const Repository = require('./generalRepository'),
    Achivements = require('../schemas/AchivementsSchema');

function AchivementsRepository() {
    Repository.prototype.constructor.call(this);
    AchivementsRepository.prototype.addAchivement = addAchivement;
    this.model = Achivements;

    function addAchivement(data, callback) {
    const model = this.model;
    const newItem = new model(data);
    newItem.save(callback);
}
}
module.exports = new AchivementsRepository();
