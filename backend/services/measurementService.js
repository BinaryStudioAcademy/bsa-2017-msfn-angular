const ApiError = require('./apiErrorService');
const measurementRepository = require('../repositories/measurementRepository');

function MeasurementService() {}

MeasurementService.prototype.getAllMeasurements = getAllMeasurements;
MeasurementService.prototype.deleteAllMeasurements = deleteAllMeasurements;
MeasurementService.prototype.getMeasurement = getMeasurement;
MeasurementService.prototype.createMeasurement = createMeasurement;
MeasurementService.prototype.updateMeasurement = updateMeasurement;
MeasurementService.prototype.deleteMeasurement = deleteMeasurement;



function createMeasurement(body, callback) {

        measurementRepository.add(body, (err, MeasurementData) => {

            if (err) return callback(err);
            if (MeasurementData === null) {
                callback(null, []);
            } else {
                callback(null, MeasurementData);
            }
        });
}


function updateMeasurement(id, body, callback) {
    measurementRepository.updateSpecific(id, body, (err, MeasurementData)=>{

        if (err) return callback(err);
        if (MeasurementData === null) {
            callback(null, []);
        } else {
            callback(null, MeasurementData);
        }
    });
}

function deleteMeasurement(id, callback) {
    measurementRepository.deleteSpecific(id, (err, MeasurementData)=>{

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


module.exports = new MeasurementService();
