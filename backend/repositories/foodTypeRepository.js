const Repository = require('./generalRepository'),
    FoodType = require('../schemas/foodTypeSchema');

function FoodTypeRepository() {
    Repository.prototype.constructor.call(this);
    this.model = FoodType;
}

FoodTypeRepository.prototype = new Repository();


FoodTypeRepository.prototype.deleteAll = deleteAll;
FoodTypeRepository.prototype.deleteById = deleteById;
FoodTypeRepository.prototype.updateById = updateById;
FoodTypeRepository.prototype.getById = getById;
FoodTypeRepository.prototype.getByName = getByName;



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

function updateById(id, body, callback) {
    const query = this.model.update({
        _id: id
    }, body);
    query.exec(callback);
}

function getById(id, callback) {
    const query = this.model.find({
        _id: id
    });
    query.exec(callback);
}

function getByName(name, callback) {
    const query = this.model.find({
        name: name
    });
    query.exec(callback);
}

module.exports = new FoodTypeRepository();
