const ObjectId = require('mongoose').Types.ObjectId;

function Repository() {

}

Repository.prototype.add = add;
Repository.prototype.addBatch = addBatch;
Repository.prototype.deleteById = deleteById;
Repository.prototype.getAll = getAll;
Repository.prototype.getById = getById;
Repository.prototype.findByObject = findByObject;

function add(data, callback) {
    const model = this.model;
    const newItem = new model(data);
    newItem.save(callback);
}

function addBatch(batchToInsert, callback) {
    const query = this.model.create(batchToInsert, callback);
}

function deleteById(id, callback) {
    const query = this.model.remove({
        _id: id
    });
    query.exec(callback);
}

function getAll(callback) {
    const query = this.model.find({});
    query.exec(callback);
}

function getById(id, callback) {
    const query = this.model.findOne({
        _id: id
    });
    query.exec(callback);
}

function findByObject(obj, populate, select, callback) {
    const query = this.model.find(obj, select).populate(populate);
    query.exec(callback);
}

module.exports = Repository;
