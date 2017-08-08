module.exports = function(io) {
    // socket io
    io.on('connection', function(socket) {
        console.log('User connected');
        socket.on('disconnect', function() {
            console.log('User disconnected');
        });
        socket.on('messageToServer', function(data) {
            console.log(`User say:${data}`);
            socket.emit('feedbackFromServer','Server say:"The message was received successfully"');
        });
    });
};
