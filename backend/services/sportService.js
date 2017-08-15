const ApiError = require('./apiErrorService');
const sportRepository = require('../repositories/sportRepository');

function SportService() {}

SportService.prototype.addItem = addItem;
SportService.prototype.updateItem = updateItem;
SportService.prototype.deleteItem = deleteItem;

function addItem(name, callback) {
    sportRepository.getByName(body.name, (err, data) => {
        if (err) return callback(err);

        if (data === null) {
            sportRepository.getAll((err, data) => {
                if (err) return callback(err);
                let maxCode = 0;

                if (data instanceof Array && data.length) {
                    data.forEach((item) => {
                        maxCode = Math.max(maxCode, item.code);
                    });
                }

                let sportData = {
                    code: maxCode++,
                    name: name,
                    description: string
                };
                SportRepository.add(sportData, callback);
            });

        } else {
            callback(new ApiError('The sport name is used already'));
        }
    });
}

function updateItem(code, body, callback) {
    sportRepository.getByCode(code, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('The kind of sport wasn\'t found'));
        } else {
            sportRepository.getByName(body.name, (err, sport) => {
                if (err) return callback(err);

                if (sport && sport.code !== code) {
                    return callback(new ApiError('Kind of sport with such name already exists'));
                }

                sportRepository.updateByCode(code, body, callback);
            });
        }
    });
}

function deleteItem(code, callback) {
    sportRepository.getByCode(code, (err, data) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('The kind of sport wasn\'t found'));
        } else {
            sportRepository.deleteByCode(code, callback);
        }
    });

}

module.exports = new SportService();
