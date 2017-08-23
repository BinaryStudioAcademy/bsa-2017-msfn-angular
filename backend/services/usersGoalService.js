const ApiError = require('./apiErrorService'),
userRepository = require('../repositories/userRepository');
goalRepository = require('../repositories/goalRepository');

function UsersGoalService() {}

UsersGoalService.prototype.addItem = addItem;
// UsersGoalService.prototype.deleteItem = deleteItem;

function addItem(data, callback) {
    // const currentUserId = data.session.passport.user;
    const currentUserId = '599dcbe405f5056114542641';
    const name = 'lose weigh';
    // console.log(currentUserId);
    // console.log(body);
    
    goalRepository.findByName(name, (err, goal) => {
        if (err) return callback(err);

        if (data === null){
            callback(new ApiError('Goal not found'));
        } else {
            // const finalDate = new Data().getTime();

            const newGoal = {
                goal: goal._id,
                startPoint: data.body.startPoint,
                startDate: new Date().getTime(),
                endPoint: data.body.startPoint,
                endDate: data.body.endDate
            };
            userRepository.addGoal(currentUserId, newGoal, (err, result) => {
                console.log('in add goal');

                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
            // userRepository.update(userId, {
            //     $push: {weightControl: {
            //         date: body.date,
            //         fatPct: body.datPct,
            //         boneWeight: body.boneWeight,
            //         waterPct: body.waterPct,
            //         weight: body.weight
            //     }}
            // }, callback);

        }
    });
}

// function deleteItem(data, callback) {
// userRepository.getById(data.user._id, (err, data) => {
//     if (err) return callback(err);

//     if (data === null){
//         callback(new ApiError('User not found'));
//     } else {
//         userRepository.update(data.user._id, {
//             $pull: {
//                 weightControl: {
//                     _id: data.body._id
//                 }
//             }
//         }, callback);
//     }
// })
// }

module.exports = new UsersGoalService();
