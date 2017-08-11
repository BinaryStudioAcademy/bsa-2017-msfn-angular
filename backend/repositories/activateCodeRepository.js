const Repository = require('./generalRepository'),
    UserService = require('../services/userService'),
    ActivateCode = require('../schemas/activateCodeSchema');

function ActivateCodeRepository() {
    Repository.prototype.constructor.call(this);
    this.model = ActivateCode;
}

ActivateCodeRepository.prototype = new Repository();

module.exports = new ActivateCodeRepository();
