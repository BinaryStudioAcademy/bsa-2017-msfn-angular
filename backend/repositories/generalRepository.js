const ObjectId = require('mongoose').Types.ObjectId;

function Repository() {

}

Repository.prototype.add = add;
Repository.prototype.addBatch = addBatch;
Repository.prototype.deleteById = deleteById;
Repository.prototype.getAll = getAll;
Repository.prototype.getById = getById;
Repository.prototype.findByObject = findByObject;
Repository.prototype.update = update;
Repository.prototype.get = get;
Repository.prototype.makeObjectId = makeObjectId;

function add(data, callback) {
    const model = this.model;
    const newItem = new model(data);
    newItem.save(callback);
}

function addBatch(batchToInsert, callback) {
    const query = this.model.create(batchToInsert, callback);
}

function deleteById(id, callback) {
    const query = this.model.update({
        _id: id
    }, {isRemoved: true});
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

function update(id, body, callback) {
    let query = this.model.update({_id: id}, body);
    query.exec(callback);
}

function get(params, callback) {
    if (params.sort === undefined) {
        params.sort = null;
    }
    if (params.limit === undefined) {
        params.limit = null;
    }
    if (params.offset === undefined) {
        params.offset = null;
    }
    if (params.fields === undefined) {
        params.fields = null;
    }
    if (params.populate === undefined) {
        params.populate = null;
    }
    let model = this.model;

    let query = model.find(params.filter)
        .sort(params.sort)
        .limit(params.limit)
        .skip(params.offset)
        .select(params.fields);
    if (params.populate) {
        query.populate(params.populate);
    }
    query.exec(callback);
}

function makeObjectId(string) {
    return ObjectId(string);
}

module.exports = Repository;
