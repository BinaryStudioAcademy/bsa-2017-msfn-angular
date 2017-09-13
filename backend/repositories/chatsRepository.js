const Repository = require('./generalRepository'),
    chat = require('../schemas/chatsSchema');

function ChatRepository() {
    Repository.prototype.constructor.call(this);
    this.model = chat;
}

ChatRepository.prototype = new Repository();

ChatRepository.prototype.GetChats = function() {

};


module.exports = new ChatRepository();
