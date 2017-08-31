const ApiError = require('./apiErrorService');
const foodRepository = require('../repositories/foodRepository');
const mongoose = require('mongoose');

function FoodService() {}

FoodService.prototype.getAllFood = getAllFood;
FoodService.prototype.deleteAllFood = deleteAllFood;
FoodService.prototype.getAllFoodByType = getAllFoodByType;
FoodService.prototype.getFood = getFood;
FoodService.prototype.getFoodByName = getFoodByName;
FoodService.prototype.createFood = createFood;
FoodService.prototype.updateFood = updateFood;
FoodService.prototype.deleteFood = deleteFood;


function getAllFood(callback) {
    foodRepository.getAll((err, foodData) => {
        if (err) {
            return err;
        }
        if (foodData === null) {
            callback(null, []);
        } else {
            callback(null, foodData);
        }
    })
}

function deleteAllFood(callback) {
    foodRepository.deleteAll((err, foodData) => {
        if (err) {
            return err;
        }
        if (foodData === null) {
            callback(null, []);
        } else {
            callback(null, foodData);
        }
    })
}

function getAllFoodByType(foodType, callback) {
    const foodTypeRegExp = new RegExp('^' + foodType + '$', 'i');
    foodRepository.getAllByType(foodTypeRegExp, (err, foodData) => {
        if (err) {
            return err;
        }
        if (foodData === null) {
            callback(null, []);
        } else {
            callback(null, foodData);
        }
    })
}

function getFood(id, callback) {
    foodRepository.getById(id, (err, foodData) => {
        if (err) {
            return err;
        }
        if (foodData === null) {
            callback(null, []);
        } else {
            callback(null, foodData);
        }
    })
}

function getFoodByName(name, callback) {
    const foodNameRegExp = new RegExp('^' + name + '$', 'i');
    foodRepository.getByName(foodNameRegExp, (err, foodData) => {
        if (err) {
            return err;
        }
        if (foodData === null) {
            callback(null, []);
        } else {
            callback(null, foodData);
        }
    })
}

function createFood(body, callback) {
    this.getFoodByName(body.name, (err, data) => {
        if (data.name) {
            callback(new ApiError('Food with such name already exists'))
        } else {
            foodRepository.add(body, (err, foodData) => {
                if (err) {
                    return err;
                }
                if (foodData === null) {
                    callback(null, []);
                } else {
                    callback(null, foodData);
                }
            })
        }
    })
}

function updateFood(id, body, callback) {
    this.getFoodByName(body.name, (err, data) => {
        if (data.name && data._id !== id) {
            callback(new ApiError('Food with such name already exists'));
        } else {
            foodRepository.updateById(id, body, (err, foodData) => {
                if (err) {
                    return err;
                }
                if (foodData === null) {
                    callback(null, []);
                } else {
                    callback(null, foodData);
                }
            })
        }
    })
}

function deleteFood(id, callback) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        foodRepository.deleteById(id, (err, foodData) => {
            if (err) {
                return err;
            }
            if (foodData === null) {
                callback(null, []);
            } else {
                callback(null, foodData);
            }
        })
    } else {
        callback(new ApiError('Invalid food id'));
    }
}

module.exports = new FoodService();
