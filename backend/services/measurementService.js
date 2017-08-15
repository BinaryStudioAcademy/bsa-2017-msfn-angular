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

    measurementRepository.getAll((err, MeasurementsData) => {
        if (err) return callback(err);
        let max = 0;
        console.log(MeasurementsData);
        if (MeasurementsData instanceof Array && MeasurementsData.length) {
            max = MeasurementsData[0].code;

            MeasurementsData.forEach((elem) => {
                max = Math.max(max, elem.code);
            });

        };
        console.log(body);
        let data = {
            name: body.name,
            code: max + 1,
            values: body.values,
            isRemoved: false
        };


        measurementRepository.add(data, (err, MeasurementData) => {

            if (err) return callback(err);
            if (MeasurementData === null) {
                callback(null, []);
            } else {
                callback(null, MeasurementData);
            }
        });
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
