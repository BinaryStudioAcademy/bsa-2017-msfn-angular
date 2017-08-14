const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');
const mongoose = require('mongoose');
var objID = mongoose.Types;

class subscribeService {

    constructor() {}

    follow(data, callback) {
        const currentUserId = data.session.passport.user;
        const userToFollow = data.body.user_id;
        userRepository.findById(currentUserId, (err, currentUser) => {
            if (currentUser.follow.find(this.itemInArray, userToFollow)) {
                callback(new ApiError("User already followed"));
            }
            currentUser.follow.push(objID.ObjectId(userToFollow));
            userRepository.update(currentUserId, currentUser, callback);
        });
    }

    unfollow(data, callback) {
        const userToFollow = data.user_id;
        const currentUserId = data.session.passport.user;
        userRepository.findById(currentUserId, (err, currentUser) => {
            const usnfollowPos = currentUser.follow.findIndex(this.itemInArray, userToFollow);
            if (usnfollowPos == -1) {
                callback(new ApiError("User wasn't follow yet"));
            }
            currentUser.follow.splice(usnfollowPos, 1);

            userRepository.update(currentUserId, currentUser, callback);
        });
    }

    getFollowing(data, callback) {
        const currentUserId = data.session.passport.user;
         userRepository.findById(currentUserId, (err, currentUser) => {
            callback(err, currentUser.follow);
        });
    }

    getFollowers(data, callback) {
        const params = {};
        const currentUserId = data.session.passport.user;
        params.filter = {follow: currentUserId};
         userRepository.get(params, (err, users) => {
            callback(err, users);
        });
    }

    itemInArray(element, index, array) {
        if (this == element) {
            return true;
        }
        return false;
    }
}

module.exports = new subscribeService();
