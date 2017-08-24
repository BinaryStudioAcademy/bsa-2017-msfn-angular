const ApiError = require('./apiErrorService'),
userRepository = require('../repositories/userRepository');
goalRepository = require('../repositories/goalRepository');

function UsersGoalService() {}

UsersGoalService.prototype.addItem = addItem;
UsersGoalService.prototype.deleteItem = deleteItem;
UsersGoalService.prototype.getAllItems = getAllItems;

function addItem(data, callback) {
    // const currentUserId = data.session.passport.user;
    const currentUserId = '599e11078b603e291160bba3';
    const name = 'lose weigh';
    
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
        }
    });
}

function deleteItem(goalId, callback) {
    userRepository.deleteGoal(goalId, (err, result) => {
        console.log('in delete goal');

        if (err) {
            return callback(err);
        }
        callback(null, result);
    }); 
}

function getAllItems(data, callback) {
    // const currentUserId = data.session.passport.user;
    const currentUserId = '599e11078b603e291160bba3';

    userRepository.getAllGoals(currentUserId, (err, user) => {
        console.log('in get goals');

        if (err) {
            return callback(err);
        }

        const result = user.goals;
        console.log(result);
        callback(null, result);
    });
}




module.exports = new UsersGoalService();
