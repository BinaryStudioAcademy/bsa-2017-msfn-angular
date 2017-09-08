const Repository = require('./generalRepository'),
    Articles = require('../schemas/articlesSchema');

function ArticlesRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Articles;
}

ArticlesRepository.prototype = new Repository();

ArticlesRepository.prototype.getByUserId = getByUserId;

function getByUserId(id, callback) {
    const query = this.model.findOne({
        userId: id
    });
    query.exec(callback);
}

ArticlesRepository.prototype.Search = function (filter, callback) {
    let model = this.model;

    let searchString = filter.search;
    delete filter.search;

    if (filter.userId && filter.userId['$in']) {
        filter.userId['$in'].forEach((item, index) => {
            filter.userId['$in'][index] = this.makeObjectId(item);
        });
    } else if (filter.userId) {
        filter.userId = this.makeObjectId(filter.userId)
    }

    const match = {
        $and: [
            {'isRemoved': false},
            filter,
            {
                $or: [
                    {'user.firstName': new RegExp(searchString, 'i')},
                    {'user.lastName': new RegExp(searchString, 'i')},
                    {'title': new RegExp(searchString, 'i')}
                ]
            }
        ]
    };

    this.model.aggregate(
        [
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $match: match
            }
        ]
    ).exec((err, result) => {
        if (err) return callback(err);

        result = result.map(item => {
            item.user = item.user.map(user => {
                user.fullName = user.firstName + ' ' + user.lastName;
                return user;
            });
            return item;
        });

        callback(null, result);
    });
};


module.exports = new ArticlesRepository();
