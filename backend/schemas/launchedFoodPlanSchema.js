const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const LaunchedFoodPlan = new Schema({
    title: String,
    kind: 'weekly' | 'daily',
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
    todayMeals: {
        date: String,
        finished: Boolean,
        eaten: Number,
        totalKcal: Number,
        meals: [{
            kcal: Number,
            name: String,
            eaten: Number,
            products: [{
                kcal: Number,
                name: String,
                quantity: Number,
                done: Boolean | null,
                _id: ObjectId,
            }]
        }],
    },
    historyMeals: [{
        date: String,
        eaten: Number,
        totalKcal: Number,
        meals: [{
            kcal: Number,
            name: String,
            date: String,
            eaten: Number,
            products: [{
                kcal: Number,
                name: String,
                quantity: Number,
                done: Boolean | null,
                _id: ObjectId,
            }]
        }],
    }],
    userID: ObjectId,
    isRemoved: Boolean,
    status: 'launched' | 'finished',
});

module.exports = mongoose.model('LaunchedFoodPlan', LaunchedFoodPlan);
