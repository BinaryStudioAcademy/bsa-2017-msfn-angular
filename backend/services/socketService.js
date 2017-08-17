const ApiError = require('./apiErrorService');
const decrypt = require('./decryptService');
const config = require('../routes/socket');

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
SocketService.prototype.InitListeners = function(socket) {
    "use strict";
    for (let method in config) {
        if (config.hasOwnProperty(method)) {
            socket.on(method, (data) => {
                config[method](data, (err, result) => {
                    if (err) {
                        if (!result) {
                            result = {};
                        }
                        result.error = true;
                        result.err = err;
                    }
                    socket.emit(`${method}:success`, JSON.stringify(result));
                });
            });
        }
    }
};

module.exports = new SocketService();
