const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');
const articlesRepository = require('../repositories/articlesRepository');
const mongoose = require('mongoose');
const objID = mongoose.Types;

class articlesService {

    constructor() {
    }

    add(req, callback) {
        let data = req.body;
        data.isRemoved = false;
        data.userId = req.session.passport.user;
        delete data._id;
        articlesRepository.add(data, (err, planData) => {
            if (err) return callback(err);
            if (planData === null) {
                callback(null, new ApiError('Can\'t create plan'));
            } else {
                callback(null, planData);
            }
        });
    }

    get(data, callback) {
        const params = {
            filter: {
                isRemoved: false,
            },
            populate: {path: 'userId', select: ['firstName', 'lastName', 'fullName', '_id', 'userPhoto']},
        };

        if (data) {
            params.filter = Object.assign(params.filter, data);
        }
        articlesRepository.get(params, (err, articlesData) => {
            if (err) return callback(err);
            if (articlesData === null) {
                callback(null, new ApiError('Not found plan'));
            } else {
                callback(null, articlesData);
            }
        });
    }

    update(id, body, callback) {
        articlesRepository.update(id, body, callback);
    }

    delete(id, callback) {
        articlesRepository.deleteById(id, callback);
    }
}

module.exports = new articlesService();
