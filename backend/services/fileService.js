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
                let fileSize = 0;

                userRepository.findById(req.body.userId, (err, currentUser) => {

                    currentUser.userPhoto = userPhotoPath;
                    userRepository.update(req.body.userId, currentUser);
                });

                res.header = ('Content-Type', 'image/' + type);

                let writeStream = new fs.WriteStream(filepath, { flags: 'w' });
                writeStream.write(buf);
                req
                    .on('data', chunk => {
                        fileSize += chunk.length;
                        console.log('data');
                        if (size > 1e6) {
                            console.log('too big!');
                            res.statusCode = 413;
                            res.setHeader('Connection', 'close');
                            res.end('File is too big!');
                            writeStream.destroy();
                            fs.unlink(filepath, err => { });
                        }
                    })
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
                            res.end('Internal error');
                        } else {
                            res.end();
                        }
                        fs.unlink(filepath, err => { });
                    })
                    .on('close', () => {
                        res.end('done');
                    });
            } else {
                return res.end('wrong format');
            }
        } else {
            return res.end('empty file')
        }
    });

    function save(data, callback_main) {
        callback_main(null, null);
    }
};
