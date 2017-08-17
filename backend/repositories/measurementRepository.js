const Repository = require('./generalRepository'),
    Measurement = require('../schemas/measurementSchema');

function MeasurementRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Measurement;
}

MeasurementRepository.prototype = new Repository();


MeasurementRepository.prototype.deleteAll = deleteAll;
MeasurementRepository.prototype.deleteSpecific = deleteSpecific;
MeasurementRepository.prototype.updateSpecific = updateSpecific;
MeasurementRepository.prototype.getSpecific = getSpecific;



function deleteSpecific(id, callback) {
    const query = this.model.update({
        _id: id,
    }, {
        isRemoved: true
    });
    query.exec(callback);
};

function deleteAll(callback) {
    const query = this.model.remove({});
    query.exec(callback);
}


function getSpecific(id, callback){
    const query = this.model.find({
        _id: id,
    });
    query.exec(callback);
}

function updateSpecific(id, body, callback) {
    const query = this.model.update({
        _id: id,
    }, {
        $set: {
			measureName: body.measureName,
			measureUnits: body.measureUnits
	    }
    });
    query.exec(callback);
};

module.exports = new MeasurementRepository();
