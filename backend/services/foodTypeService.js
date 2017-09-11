const ApiError = require('./apiErrorService');
const FoodTypeRepository = require('../repositories/foodTypeRepository');

function FoodTypeService() {}

FoodTypeService.prototype.getFoodTypeByName = getFoodTypeByName;
FoodTypeService.prototype.addFoodType = addFoodType;
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
            FoodTypeRepository.add( body, (err, foodTypeData) => {
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
    FoodTypeRepository.getAll((err, foodTypeData) => {
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
