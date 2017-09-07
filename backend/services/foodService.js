const ApiError = require('./apiErrorService');
const foodRepository = require('../repositories/foodRepository');
const mongoose = require('mongoose');

function FoodService() {}

FoodService.prototype.getAllFood = getAllFood;
FoodService.prototype.getOnlyPublishedFood = getOnlyPublishedFood;
FoodService.prototype.deleteAllFood = deleteAllFood;
FoodService.prototype.getFoodByType = getFoodByType;
FoodService.prototype.getFood = getFood;
FoodService.prototype.createFood = createFood;
FoodService.prototype.updateFood = updateFood;
FoodService.prototype.publishFood = publishFood;
FoodService.prototype.deleteFood = deleteFood;


function getOnlyPublishedFood(userId, callback) {
    foodRepository.getOnlyPublished(userId,(err, foodData) => {
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

function getAllFood(callback) {
    console.log('ALL');
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

function getFoodByType(userId, foodType, callback) {
    const foodTypeRegExp = new RegExp('^' + foodType + '$', 'i');
    foodRepository.getAllByType(userId, foodTypeRegExp, (err, foodData) => {
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

function createFood(body, callback) {
            foodRepository.add(body, (err, foodData) => {
                if (err) {
                    return err;
                }
                if (foodData === null) {
                    callback(null, []);
                } else {
                    callback(null, foodData);
                }
            });
}

function updateFood(id, body, userId, callback) {
            foodRepository.updateById(id, body, userId, (err, foodData) => {
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


function publishFood(id, isPublished, callback) {
            console.log(id, isPublished);
            foodRepository.updateIsPublished(id, isPublished, (err, foodData) => {
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

function deleteFood(id, userId, callback) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        foodRepository.deleteById(id, userId, (err, foodData) => {
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
