const Repository = require('./generalRepository'),
    chatMessage = require('../schemas/chatMessageSchema');

function ChatMessageRepository() {
    Repository.prototype.constructor.call(this);
    this.model = chatMessage;
}

ChatMessageRepository.prototype = new Repository();


module.exports = new ChatMessageRepository();
