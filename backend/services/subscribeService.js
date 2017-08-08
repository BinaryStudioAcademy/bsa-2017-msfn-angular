const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');
const mongoose = require('mongoose');
var objID = mongoose.Types;

class subscribeService {

    constructor() {this.currentUserId = '5989ab5d64b3720631f3c350';}

    follow(data, callback) {
        // const currentUserId 
        const userToFollow = data.user_id;
        console.log(userToFollow);
        userRepository.findById(currentUserId, (err, currentUser) => {
            if (currentUser.follow.find(this.itemInArray, userToFollow)) {
                console.log('error plz');
                callback(new ApiError("User already followed"));
            }
            currentUser.follow.push(objID.ObjectId(userToFollow));
            userRepository.update(currentUserId, currentUser, callback);
        });
    }

    unfollow(data, callback) {
        const userToFollow = data.user_id;

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
         userRepository.findById(currentUserId, (err, currentUser) => {
            callback(err, currentUser.follow);
        });
    }

    getFollowers(data, callback) {
        const params = {};
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
