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
FoodRepository.prototype.updateIsPublished = updateIsPublished;
FoodRepository.prototype.getById = getById;
FoodRepository.prototype.getAllByType = getAllByType;
FoodRepository.prototype.getOnlyPublished = getOnlyPublished;

function deleteAll(callback) {
    const query = this.model.remove({});
    query.exec(callback);
}

function getOnlyPublished(userId, callback) {
    const query = this.model.find({
        $or: [{
                customUserId: userId
            },
            {
                isPublished: true
            }
        ]
    });
    query.exec(callback);

}

function deleteById(id, userId, callback) {
    const query = this.model.update({
        $and: [{
                customUserId: userId
            },
            {
                _id: id
            }
        ]
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


function updateIsPublished(id, isPublished, callback) {
    const query = this.model.update({
        _id: id,
    }, {
        $set: {
            isPublished: isPublished
        }
    });
    query.exec(callback);
}

function updateById(id, body, userId, callback) {
    const query = this.model.update({
        $and: [{
                customUserId: userId
            },
            {
                _id: id,
            }
        ]
    }, body);
    query.exec(callback);
}


function getAllByType(userId, foodType, callback) {
    const query = this.model.find({
        $and: [{
                $or: [{
                        customUserId: userId
                    },
                    {
                        isPublished: true
                    }
                ]
            },
            {
                foodType: foodType
            }
        ]
    });
    query.exec(callback);
}

module.exports = new FoodRepository();
