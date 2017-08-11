const fs = require('fs'),
    userRepository = require('../repositories/userRepository');

module.exports = function (req, res, obj, error) {
    error = error || false;

    save(req, function (data) {
        if (req.body.data) {

            if (req.body.fileType = 'img') {
                const type = req.body.data.split('data:image/')[1].split(';')[0];
                const file = req.body.data.replace(/^data:image\/\w+;base64,/, "");
                const buf = new Buffer(file, 'base64');
                const userPhotoPath = '/../../resources/usersImg/' + req.body.userId + '.' + type;
                const filepath = __dirname + userPhotoPath;
                let responseMessage = {};

                // max size is 3mb
                if (buf.byteLength > 3e+6) {
                    res.writeHead(500, { 'Status': 'file is too big, max size is 3mb' });
                    return res.end();
                }

                // add/update userPhotoPath in database
                userRepository.findById(req.body.userId, (err, currentUser) => {
                    currentUser.userPhoto = userPhotoPath;
                    userRepository.update(req.body.userId, currentUser);
                });

                let writeStream = new fs.WriteStream(filepath, { flags: 'w' });
                writeStream.write(buf);

                // error processing
                req
                    .on('close', () => {
                        writeStream.destroy();
                        fs.unlink(filepath, err => { });
                    })
                    .pipe(writeStream);
                writeStream
                    .on('error', err => {
                        console.error(err);
                        if (!res.headersSent) {
                            res.writeHead(500, { 'Connection': 'close' });
                            return res.end();
                        } else {
                            return res.end();
                        }
                        fs.unlink(filepath, err => { });
                    })
                    .on('close', () => {
                        res.writeHead(201, { 'Status': 'done' });
                        responseMessage.statusCode = 201
                        responseMessage.statusMessage = 'done';
                        return res.end(JSON.stringify(responseMessage));
                    });
            } else {
                res.writeHead(400, { 'Status': 'wrong format' });
                return res.end();
            }
        } else {
            res.writeHead(400, { 'Status': 'empty file' });
            return res.end();
        }
    });

    function save(data, callback_main) {
        callback_main(null, null);
    }
};
