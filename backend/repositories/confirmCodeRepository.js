const Repository = require('./generalRepository'),
    UserService = require('../services/userService'),
    ConfirmCode = require('../schemas/confirmCodeSchema');

function ConfirmCodeRepository() {
    Repository.prototype.constructor.call(this);
    this.model = ConfirmCode;
}

ConfirmCodeRepository.prototype = new Repository();
ConfirmCodeRepository.prototype.deleteCode = deleteCode;

function deleteCode(codeId, callback) {
    const query = this.model.remove({
        _id: codeId
    });
    query.exec(callback);
}

module.exports = new ConfirmCodeRepository();
