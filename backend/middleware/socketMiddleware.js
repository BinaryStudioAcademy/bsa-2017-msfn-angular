module.exports = function(io, MongoStore) {
    const socketService = require("../services/socketService");
    const cookieParser = require("cookie-parser");
    const sessionConfig = require('../config/session');
    const UserRepository = require('../repositories/userRepository');
    const cookie = require("cookie");
    const decrypt = require('../services/decryptService');

    socketService.SetIO(io);

    io.use(function(socket, callback){

        let handshake = socket.request;

        handshake.cookies = cookie.parse(handshake.headers.cookie || "");

        let sid = cookieParser.signedCookie(handshake.cookies['connect.sid'], sessionConfig.secret);

        MongoStore.load(sid, function(err, session){
            if (err) return callback(err);

            if (!session
                || !session.passport
                || !session.passport.user) return callback('no user in session');

            handshake.session = session;

            UserRepository.getById(session.passport.user, (err, user) => {
                if (err) return callback(err);

                if (!user) {
                    return callback('Wrong user id');
                }

                socket.user = user;

                callback(null, true);
            })
        });
    });

    io.on('connection', (socket) => {
        socketService.SetSocket(socket);
        socketService.AddUser(socket);
        socketService.InitListeners(socket);
        if (socket.user.isAdmin) {
            socketService.JoinRoom('admin', () => {});
        }

        socket.on('disconnecting', (reason) => {
            const rooms = Object.keys(socket.rooms);

            rooms.forEach(room => {
                socketService.BroadcastRoom('check_user_online:success', room, JSON.stringify({room: room, user: socket.user._id, online: false}));
            });
        });

        socket.on('disconnect', (data) => {
            socketService.RemoveUser(socket);
        });
    });


};
