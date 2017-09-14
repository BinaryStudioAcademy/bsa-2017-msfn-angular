const ApiError = require('./apiErrorService');
const FoodTypeRepository = require('../repositories/foodTypeRepository');
const async = require('async');
const parallel = require('async/parallel');

function FoodTypeService() { }

FoodTypeService.prototype.getFoodTypeByName = getFoodTypeByName;
FoodTypeService.prototype.addFoodType = addFoodType;
FoodTypeService.prototype.addAll = addAll;
FoodTypeService.prototype.updateFoodType = updateFoodType;
FoodTypeService.prototype.deleteFoodType = deleteFoodType;
FoodTypeService.prototype.getAllFoodTypes = getAllFoodTypes;



function getFoodTypeByName(name, callback) {
    const nameRegExp = new RegExp('^' + name + '$', 'i');
    FoodTypeRepository.getByName(nameRegExp, (err, foodTypeData) => {
        if (err) {
            return callback(err);
        }
        if (foodTypeData === null) {
            callback(null, []);
        } else {
            callback(null, foodTypeData);
        }
    });
}

function addFoodType(body, callback) {
    this.getFoodTypeByName(body.name, (err, data) => {
        if (data.name) {
            callback(new ApiError('Food type with such name already exists'));
        } else {
            FoodTypeRepository.add(body, (err, foodTypeData) => {
                if (err) {
                    return callback(err);
                }
                if (foodTypeData === null) {
                    callback(null, []);
                } else {
                    callback(null, foodTypeData);
                }
            });
        }
    });
}

function addAll(types, callback) {
    let funcArray = [];
    for (let i = 0; i < types.length; i++) {
        const currentType = types[i];
        const addFunc = (callback) => {
            FoodTypeRepository.add(currentType, callback);
        }
        funcArray.push(addFunc);
    }
    async.parallel(funcArray,
        (err, results) => {
            let createdTypes = [];
            for (let i = 0; i < results.length; i++) {
                let currentRes = results[i];
                createdTypes.push(currentRes[0]);
            }
            callback(err, {status: `Created ${results.length} food types `, types: createdTypes});
        });
}

function deleteFoodType(id, callback) {
    FoodTypeRepository.deleteById(id, (err, foodTypeData) => {
        if (err) {
            return callback(err);
        }
        if (foodTypeData === null) {
            callback(null, []);
        } else {
            callback(null, foodTypeData);
        }
    });
}

function updateFoodType(id, body, callback) {
    FoodTypeRepository.updateById(id, body, (err, foodTypeData) => {
        if (err) {
            return callback(err);
        }
        if (foodTypeData === null) {
            callback(null, []);
        } else {
            callback(null, foodTypeData);
        }
    });
}

function getAllFoodTypes(callback) {
    const params = {
        filter: {
            isRemoved: false,
        },
        populate: { path: 'parentType', select: ['name', '_id', 'depthLvl'] },
    };
    FoodTypeRepository.get(params, (err, foodTypeData) => {
        if (err) {
            return callback(err);
        }
        if (foodTypeData === null) {
            callback(null, []);
        } else {
            callback(null, foodTypeData);
        }
    });
}


module.exports = new FoodTypeService();
