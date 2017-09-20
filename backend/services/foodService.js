const ApiError = require('./apiErrorService');
const foodRepository = require('../repositories/foodRepository');
const mongoose = require('mongoose');
const async = require('async');
const parallel = require('async/parallel');

function FoodService() { }

FoodService.prototype.addAll = addAll;
FoodService.prototype.getAllFood = getAllFood;
FoodService.prototype.getOnlyPublishedFood = getOnlyPublishedFood;
FoodService.prototype.deleteAllFood = deleteAllFood;
FoodService.prototype.getFoodByType = getFoodByType;
FoodService.prototype.getFood = getFood;
FoodService.prototype.createFood = createFood;
FoodService.prototype.updateFood = updateFood;
FoodService.prototype.publishFood = publishFood;
FoodService.prototype.deleteFood = deleteFood;

function addAll(types, callback) {
    let funcArray = [];
    for (let i = 0; i < types.length; i++) {
        const currentType = types[i];
        const addFunc = (callback) => {
            foodRepository.add(currentType, callback);
        }
        funcArray.push(addFunc);
    }
    async.parallel(funcArray,
        (err, results) => {
            let createdItems = [];
            for (let i = 0; i < results.length; i++) {
                let currentRes = results[i];
                createdItems.push(currentRes[0]);
            }
            callback(err, { status: `Created ${results.length} food items `, items: createdItems });
        });
}
function getOnlyPublishedFood(userId, callback) {
    foodRepository.getOnlyPublished(userId, (err, foodData) => {
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

function updateFood(id, body, callback) {
    foodRepository.update(id, body, callback);
}


function publishFood(id, isPublished, callback) {
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
