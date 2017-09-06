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
};


module.exports = new ArticlesRepository();
