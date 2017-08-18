const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');
const mongoose = require('mongoose');
const objID = mongoose.Types;
const socketService = require('./socketService');

class subscribeService{

    constructor() {
    }

    follow(data, callback) {
        if (!data.session
            || !data.session.passport
            || !data.session.passport.user)
            return callback(new ApiError("Not authorized"));
        const currentUserId = data.session.passport.user;
        const userToFollow = data.body.user_id;
        if (currentUserId === userToFollow) {
            return callback(new ApiError("Cant follow yourself"));
        }
        userRepository.findById(currentUserId, (err, currentUser) => {
            if (currentUser.follow.indexOf(userToFollow) !== -1) {
                return callback(new ApiError("User already followed"));
            }
            currentUser.follow.push(objID.ObjectId(userToFollow));
            userRepository.update(currentUserId, currentUser, (err, res) => {
                if (err) return callback(err);

                const userToFollowSocket = socketService.GetUserById(userToFollow);
                if (userToFollowSocket) {
                    socketService.EmitTo(userToFollowSocket, 'follow', {
                        email: currentUser.email,
                        id: currentUser.id
                    });
                }

                callback(err, res);
            });
        });
    }

    unfollow(data, callback) {
        const userToFollow = data.body.user_id;
        const currentUserId = data.session.passport.user;
        userRepository.findById(currentUserId, (err, currentUser) => {
            const usnfollowPos = currentUser.follow.findIndex(this.itemInArray, userToFollow);
            if (usnfollowPos === -1) {
                return callback(new ApiError("User isn't followed"));
            }
            currentUser.follow.splice(usnfollowPos, 1);

            userRepository.update(currentUserId, currentUser, callback);
        });
    }

    getFollowing(data, callback) {
        const currentUserId = data.session.passport.user;
        userRepository.findById(currentUserId, (err, currentUser) => {
            const params = {
                fields: '_id firstName lastName userPhoto'
            };
            userRepository.getUsersFromArrayID(currentUser.follow, params, (err, followingUsers) => {
                callback(err, followingUsers);
            });
        });
    }

    getFollowers(data, callback) {
        const currentUserId = data.session.passport.user;
        const params = {
            filter: {follow: currentUserId},
            fields: '_id firstName lastName userPhoto'
        };
        params.filter = {follow: currentUserId};
        userRepository.get(params, (err, users) => {
            callback(err, users);
        });
    }

    itemInArray(element, index, array) {
        return (this === element.toHexString());
    }
}

module.exports = new subscribeService();
