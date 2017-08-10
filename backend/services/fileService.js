const fs = require('fs');

module.exports = function (req, res, obj, error) {
    error = error || false;

    save(req, function (data) {
        if (req.body.img) {
            const type = req.body.img.split('data:image/')[1].split(';')[0];
            const file = req.body.img.replace(/^data:image\/\w+;base64,/, "");
            const buf = new Buffer(file, 'base64');
            const filepath = __dirname + '/../../resources/userPhoto/' + req.body.name + '.' + type;

            res.header = ('Content-Type', 'image/' + type);

            let writeStream = new fs.WriteStream(filepath, { flags: 'w' });
            writeStream.write(buf);
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
            return res.end('need img')
        }
    });

    function save(data, callback_main) {
        callback_main(null, null);
    }
};
