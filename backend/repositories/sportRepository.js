const Repository = require('./generalRepository'),
    Sport = require('../schemas/sportSchema');

function SportRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Sport;
}

SportRepository.prototype = new Repository();

SportRepository.prototype.getByCode = getByCode;
SportRepository.prototype.getByName = getByName;
SportRepository.prototype.updateByCode = updateByCode;
SportRepository.prototype.deleteByCode = deleteByCode;
SportRepository.prototype.deleteAll = deleteAll;

function getByCode(code, callback) {
    const query = this.model.findOne({
        code: code
    });
    query.exec(callback);
}

function getByName(name, callback) {
    const query = this.model.findOne({name : name});
    query.exec(callback);
}

function updateByCode(code, body, callback) {
    const query = this.model.update({
        code: code
    }, body);
    query.exec(callback);
}

function deleteByCode(code, callback) {
    const query = this.model.remove({
        code: code
    });
    query.exec(callback);
}

function deleteAll(callback) {
    const query = this.model.remove({});
    query.exec(callback);
}

module.exports = new SportRepository();
