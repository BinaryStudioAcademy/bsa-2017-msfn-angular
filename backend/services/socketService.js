const ApiError = require('./apiErrorService');
const decrypt = require('./decryptService');

function SocketService() {
    "use strict";
    this.users = [];
}
SocketService.prototype.addListener = function(event, callback) {
    "use strict";
    if (this.socket) {
        this.socket.on(event, (data) => {
            callback(data);
        });
    }
};
SocketService.prototype.Emit = function(event, data) {
    "use strict";
    if (this.socket){
        this.socket.emit(event, data);
    }
};
SocketService.prototype.EmitTo = function(socket, event, data) {
    "use strict";
    console.log(event);
    console.log(data);
    console.log(socket.user);
    socket.emit(event, data);
};
SocketService.prototype.Broadcast = function(event, data) {
    "use strict";
    if (this.socket){
        this.socket.broadcast(event, data);
    }
};
SocketService.prototype.SetSocket = function(socket) {
    "use strict";
    this.socket = socket;
};
SocketService.prototype.AddUser = function(socket) {
    "use strict";
    this.users.push(socket);
    console.log(this.users.length);
};
SocketService.prototype.RemoveUser = function(socket) {
    "use strict";
    this.users.splice(this.users.indexOf(socket), 1);
};
SocketService.prototype.GetUserByEmail = function(email) {
    "use strict";
    const _return = this.users.filter(socket => {
        return (socket.user.email === email);
    });
    return _return.shift();
};
SocketService.prototype.GetUserById = function(id) {
    "use strict";
    const _return = this.users.filter(socket => {
        return (socket.user._id.toString() === id);
    });
    return _return.shift();
};

module.exports = new SocketService();
