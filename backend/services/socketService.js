const ApiError = require('./apiErrorService');
const config = require('../routes/socket');
const decryptService = require('./decryptService');

function SocketService() {
    this.users = [];
}
SocketService.prototype.addListener = function(event, callback) {
    if (this.socket) {
        this.socket.on(event, (data) => {
            callback(data);
        });
    }
};

SocketService.prototype.Emit = function(event, data) {
    if (this.socket){
        this.socket.emit(event, data);
    }
};

SocketService.prototype.EmitTo = function(socket, event, data) {
    socket.emit(event, data);
};

SocketService.prototype.Broadcast = function(event, data) {
    if (this.socket){
        this.socket.broadcast(event, data);
    }
};

SocketService.prototype.BroadcastRoom = function(event, room, data) {
    this.io.sockets.in(room).emit(event, data);
};

SocketService.prototype.SetIO = function(io) {
    this.io = io;
};

SocketService.prototype.SetSocket = function(socket) {
    this.socket = socket;
};

SocketService.prototype.AddUser = function(socket) {
    this.users.push(socket);
};

SocketService.prototype.RemoveUser = function(socket) {
    this.users.splice(this.users.indexOf(socket), 1);
};

SocketService.prototype.GetUserByEmail = function(email) {
    const _return = this.users.filter(socket => {
        return (socket.user.email === email);
    });
    return _return.shift();
};

SocketService.prototype.GetUserById = function(id) {
    const _return = this.users.filter(socket => {
        return (socket.user._id.toString() === id);
    });
    return _return.shift();
};

SocketService.prototype.JoinRoom = function(json, callback) {
    let data;
    try {
        data = JSON.parse(json);
    } catch (err) {
        return callback(err);
    }
    let room;
    ({room} = data);
    if (!room) return callback(new ApiError('No room specified'));

    this.socket.join(room);
    callback(null, true);
};

SocketService.prototype.InitListeners = function(socket) {
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

SocketService.prototype.CheckUserOnline = function(data, callback) {
    const decryptedData = decryptService(data);
    const userId = decryptedData.user;

    const userSocket = this.GetUserById(userId);

    if (!userSocket) {
        return callback(null, {user: userId, online: false});
    }
    callback(null, {user: userId, online: true});
};

module.exports = new SocketService();
