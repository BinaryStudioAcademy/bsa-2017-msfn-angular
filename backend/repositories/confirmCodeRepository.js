const Repository = require('./generalRepository'),
    UserService = require('../services/userService'),
    ConfirmCode = require('../schemas/confirmCodeSchema');

function ConfirmCodeRepository() {
    Repository.prototype.constructor.call(this);
    this.model = ConfirmCode;
}

ConfirmCodeRepository.prototype = new Repository();

module.exports = new ConfirmCodeRepository();
