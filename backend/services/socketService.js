const ApiError = require('./apiErrorService');
const decrypt = require('./decryptService');

function SocketService() {
}
SocketService.prototype.addListener = function(event, callback) {
    "use strict";
    if (this.socket) {
        this.socket.on(event, (data) => {
            callback(data);
        });
    } else {
        console.log("SOCKET IS NOT SET");
    }
};
SocketService.prototype.Emit = function(event, data){
    "use strict";
    if (this.socket){
        this.socket.emit(event, data);
    } else {
        console.log("SOCKET IS NOT SET");
    }
};
SocketService.prototype.Broadcast = function(event, data){
    "use strict";
    if (this.socket){
        this.socket.broadcast(event, data);
    } else {
        console.log("SOCKET IS NOT SET");
    }
};
SocketService.prototype.SetSocket = function(socket){
    "use strict";
    this.socket = socket;
};

module.exports = new SocketService;
