const ApiError = require('./apiErrorService');
const measurementRepository = require('../repositories/measurementRepository');

function MeasurementService() {}

MeasurementService.prototype.getAllMeasurements = getAllMeasurements;
MeasurementService.prototype.deleteAllMeasurements = deleteAllMeasurements;
MeasurementService.prototype.getMeasurement = getMeasurement;
MeasurementService.prototype.getMeasurementByName = getMeasurementByName;
MeasurementService.prototype.createMeasurement = createMeasurement;
MeasurementService.prototype.updateMeasurement = updateMeasurement;
MeasurementService.prototype.deleteMeasurement = deleteMeasurement;



function createMeasurement(body, callback) {

    this.getMeasurementByName(body.measureName, (err, data) => {
        if (data instanceof Array && data.length > 0) {
            callback(new ApiError('This measure name already exists'));
        } else {
            measurementRepository.add(body, (err, MeasurementData) => {

                if (err) return callback(err);
                if (MeasurementData === null) {
                    callback(null, []);
                } else {
                    callback(null, MeasurementData);
                }
            });
        }
    });


}


function updateMeasurement(id, body, callback) {

    this.getMeasurementByName(body.measureName, (err, data) => {
        if (data instanceof Array && data.length > 0 && data[0]._id != body.id) {
            callback(new ApiError('This measure name already exists'));
        } else {
            measurementRepository.updateSpecific(id, body, (err, MeasurementData) => {

                if (err) return callback(err);
                if (MeasurementData === null) {
                    callback(null, []);
                } else {
                    callback(null, MeasurementData);
                }
            });

        }
    });


}

function deleteMeasurement(id, callback) {
    measurementRepository.deleteSpecific(id, (err, MeasurementData) => {

        if (err) return callback(err);
        if (MeasurementData === null) {
            callback(null, []);
        } else {
            callback(null, MeasurementData);
        }
    });
}


function deleteAllMeasurements(callback) {
    measurementRepository.deleteAll((err, MeasurementData) => {

        if (err) return callback(err);
        if (MeasurementData === null) {
            callback(null, []);
        } else {
            callback(null, MeasurementData);
        }
    });
}

function getAllMeasurements(callback) {
    measurementRepository.getAll((err, MeasurementsData) => {

        if (err) return callback(err);
        if (MeasurementsData === null) {
            callback(null, []);
        } else {
            callback(null, MeasurementsData);
        }
    });
}


function getMeasurement(id, callback) {
    measurementRepository.getSpecific(id, (err, MeasurementData) => {

        if (err) return callback(err);
        if (MeasurementData === null) {
            callback(null, []);
        } else {
            callback(null, MeasurementData);
        }
    });
}


function getMeasurementByName(measureName, callback) {
    const measureNameRegExp = new RegExp('^' + measureName + '$', 'i');
    measurementRepository.getSpecificByName(measureNameRegExp, (err, MeasurementData) => {

        if (err) return callback(err);
        if (MeasurementData === null) {
            callback(null, []);
        } else {
            callback(null, MeasurementData);
        }
    });
}


module.exports = new MeasurementService();
