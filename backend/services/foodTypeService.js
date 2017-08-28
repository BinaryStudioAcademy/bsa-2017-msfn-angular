const ApiError = require('./apiErrorService');
const FoodTypeRepository = require('../repositories/foodTypeRepository');

function FoodTypeService() {}

FoodTypeService.prototype.getFoodTypeByName = getFoodTypeByName;
FoodTypeService.prototype.addFoodType = addFoodType;
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

function addFoodType(name, callback) {
    this.getFoodByName(name, (err, data) => {
        if (data.name) {
            callback(new ApiError('Food type with such name already exists'));
        } else {
            FoodTypeRepository.add( {name: name}, (err, foodTypeData) => {
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

function deleteFoodType(name, callback) {
    FoodTypeRepository.deleteByName(name, (err, foodTypeData) => {
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
