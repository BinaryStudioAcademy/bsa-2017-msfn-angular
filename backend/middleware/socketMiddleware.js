module.exports = function(io) {
    const socketService = require("../services/socketService");

    io.on('connection', (socket) => {
        "use strict";
        socketService.SetSocket(socket);

        socket.on('follow', (data) => {
            console.log(data);
        });
    });
};
