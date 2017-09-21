const Repository = require('./generalRepository'),
        Tribe = require('../schemas/tribeSchema');

function TribeRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Tribe;
}

TribeRepository.prototype = new Repository();

TribeRepository.prototype.updateById = updateById;
TribeRepository.prototype.getApplicants = getApplicants;
TribeRepository.prototype.deleteById = deleteById;
TribeRepository.prototype.getByCreatorId = getByCreatorId;
TribeRepository.prototype.addFollowers = addFollowers;
TribeRepository.prototype.banUser = banUser;

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

function getApplicants(category, id, callback) {
    const query = this.model.find({
        _id: id
    }, {
        [category]: 1
    })
        .populate({
            path: category,
            select: ['firstName', 'lastName', 'fullName', 'userPhoto']
        });
}


function addFollowers(id, user, callback) {
    const query = this.model.update({
        _id: id
    }, {
        $addToSet: {
            members: user
        }
    });
    query.exec(callback);
}

function banUser(id, user, callback) {
    const query = this.model.update({
        _id: id
    }, {
        $addToSet: {
            banned: user
        }
    });
    query.exec(callback);
}


module.exports = new TribeRepository();
