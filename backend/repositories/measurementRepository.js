const Repository = require('./generalRepository'),
    Measurement = require('../schemas/measurementSchema');

function MeasurementRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Measurement;
}

MeasurementRepository.prototype = new Repository();

MeasurementRepository.prototype.findByCode = findByCode;
MeasurementRepository.prototype.findByName = findByName;
MeasurementRepository.prototype.deleteAll = deleteAll;
MeasurementRepository.prototype.deleteByCode = deleteByCode;
MeasurementRepository.prototype.update = update;

function findByCode(code, callback) {
    const query = this.model.findOne({
        code: code
    });
    query.exec(callback);
};


function findByName(name, callback) {
    const query = this.model.findOne({
        name: name
    });
    query.exec(callback);
};

function deleteByCode(code, callback) {
    const query = this.model.update({
        code: code
    }, {
        isRemoved: true
    });
    query.exec(callback);
};

function deleteAll(callback) {
    const query = this.model.remove({});
    query.exec(callback);
}

function update(body, callback) {
    const query = this.model.update({
        code: body.code
    }, body);
    query.exec(callback);
};

module.exports = new MeasurementRepository();
