const Repository = require('./generalRepository'),
        Tribe = require('../schemas/tribeSchema');

function TribeRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Tribe;
}

TribeRepository.prototype = new Repository();

TribeRepository.prototype.updateById = updateById;
TribeRepository.prototype.deleteById = deleteById;
TribeRepository.prototype.getByCreatorId = getByCreatorId;

function updateById(id, body, callback) {
    const query = this.model.update(
        {
            _id: id
        }, {
            $set: {
                body: body
            }
        }
    );
    query.exec(callback);
}

function deleteById(id, callback) {
    this.updateById(id, { isRemoved: true}, callback);
}

function getByCreatorId(creator, callback ) {
    const query = this.model.find({
        creator: creator
    });
    query.exec(callback);
}


module.exports = new TribeRepository();
