const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const LaunchedFoodPlan = new Schema({
    title: String,
    type: 'weekly' | 'daily',
    days: [{
        kcal: Number,
        name: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday',
        meals: [{
            kcal: Number,
            name: String,
            products: [{
                kcal: Number,
                name: String,
                quantity: Number,
                _id: ObjectId,
            }]
        }]
    }],
    meals: [{
        kcal: Number,
        name: String,
        products: [{
            kcal: Number,
            name: String,
            quantity: Number,
            _id: ObjectId,
        }]
    }],
    userID: ObjectId,
    isRemoved: Boolean,
    status: 'launched' | 'finished',
});

module.exports = mongoose.model('LaunchedFoodPlan', LaunchedFoodPlan);
