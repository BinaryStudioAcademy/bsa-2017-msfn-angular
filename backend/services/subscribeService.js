const ApiError = require('./apiErrorService');
const userRepository = require('../repositories/userRepository');
const mongoose = require('mongoose');
const objID = mongoose.Types;
const socketService = require('./socketService');
const notificationService = require('./notificationService');
const notificationRepository = require('../repositories/notificationRepository');

class subscribeService {

    constructor() {}

    follow(data, callback) {
        if (!data.session ||
            !data.session.passport ||
            !data.session.passport.user)
            return callback(new ApiError("Not authorized"));
        const currentUserId = data.session.passport.user;
        const userToFollow = data.body.user_id;
        if (currentUserId === userToFollow) {
            return callback(new ApiError("Cant follow yourself"));
        }
        userRepository.findById(currentUserId, (err, currentUser) => {
            let userFollowingList = [...currentUser.follow];
            if (userFollowingList.indexOf(userToFollow) !== -1) {
                return callback(new ApiError("User already followed"));
            }
            userFollowingList.push(objID.ObjectId(userToFollow));
            userRepository.update(currentUserId, {
                follow: userFollowingList
            }, (err, res) => {
                if (err) return callback(err);

                notificationService.AddNotification(
                    {
                        userId: userToFollow,
                        title: 'New follower',
                        message: 'New follower - ' + currentUser.email,
                        creator: currentUserId,
                        category: 'follow'
                    },
                    (err, res) => {
                        if (err) return callback(err);

                        const userToFollowSocket = socketService.GetUserById(userToFollow);
                        if (userToFollowSocket) {
                            res.email = currentUser.email;
                            socketService.EmitTo(userToFollowSocket, 'follow', res);
                        }

                        callback(err, true);
                    }
                );
            });
        });
    }

    unfollow(data, callback) {
        const userToFollow = data.body.user_id;
        const currentUserId = data.session.passport.user;
        userRepository.findById(currentUserId, (err, currentUser) => {
            let newFollowingList = [...currentUser.follow];
            const usnfollowPos = newFollowingList.findIndex(this.itemInArray, userToFollow);
            if (usnfollowPos === -1) {
                return callback(new ApiError("User isn't followed"));
            }
            newFollowingList.splice(usnfollowPos, 1);

            userRepository.update(currentUserId, {
                follow: newFollowingList
            }, (err, res) => {
                if (err) return callback(err);

                notificationRepository.get({
                    filter: {
                        userId: userToFollow,
                        creator: currentUserId,
                        category: 'follow',
                        read: false,
                        isRemoved: false
                    }
                }, (err, notifications) => {
                    if (err) return callback(err);

                    const userToFollowSocket = socketService.GetUserById(userToFollow);

                    notifications.forEach(item => {
                        notificationRepository.deleteById(item._id, (err, res) => {
                            if (err) return callback(err);

                            if (userToFollowSocket) {
                                socketService.EmitTo(userToFollowSocket, 'unfollow', {
                                    id: item._id
                                });
                            }
                        })
                    });

                    callback(err, true);
                });
            });
        });
    }

    getFollowing(data, callback) {
        const userId = data.params.id;
        userRepository.findById(userId, (err, currentUser) => {
            const params = {
                fields: '_id firstName lastName userPhoto'
            };
            userRepository.getUsersFromArrayID(currentUser.follow, params, (err, followingUsers) => {
                callback(err, followingUsers);
            });
        });
    }

    getFollowers(data, callback) {
        const userId = data.params.id;
        const params = {
            filter: {
                follow: userId
            },
            fields: '_id firstName lastName userPhoto'
        };
        userRepository.get(params, (err, users) => {
            callback(err, users);
        });
    }

    itemInArray(element, index, array) {
        return (this === element.toHexString());
    }
}

module.exports = new subscribeService();
