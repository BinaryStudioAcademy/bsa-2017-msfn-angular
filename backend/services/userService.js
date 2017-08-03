const userRepository = require('../repositories/userRepository');

function UserService() {

}

UserService.prototype.addItem = addItem;
UserService.prototype.updateItem = updateItem;

function addItem(body, callback) {
    userRepository.add(body, callback);  
}

function updateItem(id, body, callback) {
    userRepository.setObjPropsById(id, body, callback);
}

module.exports = new UserService();
