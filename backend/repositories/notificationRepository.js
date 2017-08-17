const Repository = require('./generalRepository'),
    Notification = require('../schemas/notificationSchema');

function NotificationRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Notification;
}

NotificationRepository.prototype = new Repository();

module.exports = new NotificationRepository();
