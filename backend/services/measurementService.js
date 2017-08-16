const ApiError = require('./apiErrorService');
const measurementRepository = require('../repositories/measurementRepository');

function MeasurementService() {}

MeasurementService.prototype.getAllMeasurements = getAllMeasurements;
MeasurementService.prototype.getMeasurementByCode = getMeasurementByCode;
MeasurementService.prototype.getMeasurementByName = getMeasurementByName;
MeasurementService.prototype.deleteMeasurementByCode = deleteMeasurementByCode;
MeasurementService.prototype.deleteAllMeasurements = deleteAllMeasurements;
MeasurementService.prototype.createMeasurement = createMeasurement;
MeasurementService.prototype.updateMeasurement = updateMeasurement;



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


function updateMeasurement(body, callback) {
    measurementRepository.update(body, (err, MeasurementData)=>{

        if (err) return callback(err);
        if (MeasurementData === null) {
            callback(null, []);
        } else {
            callback(null, MeasurementData);
        }
    });
}

function deleteMeasurementByCode(code, callback) {
    measurementRepository.deleteByCode(code, (err, MeasurementData)=>{

        if (err) return callback(err);
        if (MeasurementData === null) {
            callback(null, []);
        } else {
            callback(null, MeasurementData);
        }
    });
}


function getMeasurementByCode(code, callback) {
    measurementRepository.findByCode(code, (err, MeasurementData)=>{

        if (err) return callback(err);
        if (MeasurementData === null) {
            callback(null, []);
        } else {
            callback(null, MeasurementData);
        }
    });
}


function getMeasurementByName(name, callback) {
    measurementRepository.findByName(name, (err, MeasurementData)=>{

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


module.exports = new MeasurementService();
