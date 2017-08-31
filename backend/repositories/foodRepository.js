const Repository = require('./generalRepository'),
    Food = require('../schemas/foodSchema');

function FoodRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Food;
}

FoodRepository.prototype = new Repository();


FoodRepository.prototype.deleteAll = deleteAll;
FoodRepository.prototype.deleteById = deleteById;
FoodRepository.prototype.updateById = updateById;
FoodRepository.prototype.getById = getById;
FoodRepository.prototype.getByName = getByName;
FoodRepository.prototype.getAllByType = getAllByType;

function deleteAll(callback) {
    const query = this.model.remove({});
    query.exec(callback);
}

function deleteById(id, callback) {
    const query = this.model.update({
        _id: id
    }, {
        isRemoved: true
    });
    query.exec(callback);
}

function getById(id, callback) {
    const query = this.model.find({
        _id: id,
    });
    query.exec(callback);
}

function updateById(id, body, callback) {
    const query = this.model.update({
        _id: id
    }, {
        $set: {
            name: body.name,
            foodType: body.foodType,
            kcal: body.kcal,
            protein: body.protein,
            fat: body.fat,
            carbons: body.carbons,
            vendor: body.vendor,
            description: body.description,
            picture: body.picture
        }
    });
    query.exec(callback);
}

function getByName(name, callback) {
    const query = this.model.find({
        name: name
    });
    query.exec(callback);
}

function getAllByType(foodType, callback) {
    const query = this.model.find({
        foodType: foodType
    });
    query.exec(callback);
}

module.exports = new FoodRepository();
