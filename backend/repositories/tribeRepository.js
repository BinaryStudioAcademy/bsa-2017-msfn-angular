const Repository = require('./generalRepository'),
        Tribe = require('../schemas/tribeSchema');

function TribeRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Tribe;
}

TribeRepository.prototype = new Repository();

TribeRepository.prototype.updateById = updateById;
TribeRepository.prototype.getAllTribes = getAllTribes;
TribeRepository.prototype.deleteById = deleteById;
TribeRepository.prototype.getByCreatorId = getByCreatorId;

function updateById(id, body, callback) {
    const query = this.model.update(
        {
            $and: {
                _id: id
            }
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

function getByCreatorId(userId, callback ) {
    const query = this.model.findOne({
        creatorId: userId
    });
    query.exec(callback);
}

function getAllTribes(callback) {
    const query = this.model.find({}).populate('name', 'description', 'creator');
    query.exec(callback);
}


module.exports = new TribeRepository();
