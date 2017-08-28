const apiResponse = require('express-api-response');
const exerciseService = require('../../services/exerciseService');
const trainingPlanService = require('../../services/trainingPlanService');
const baseUrl = '/api/fake-data/';

module.exports = function (app) {
    app.put(baseUrl + 'training-plan', function (req, res, next) {
        if (!req.session || !req.session.passport || !req.session.passport.user){
            return next('Auth required');
        }

        const days = [
            { 'key': '1', 'value': 'Mon', 'checked': false, code: 'MO' },
            { 'key': '2', 'value': 'Tue', 'checked': false, code: 'TU' },
            { 'key': '3', 'value': 'Wed', 'checked': false, code: 'WE' },
            { 'key': '4', 'value': 'Thu', 'checked': false, code: 'TH' },
            { 'key': '5', 'value': 'Fri', 'checked': false, code: 'FR' },
            { 'key': '6', 'value': 'Sat', 'checked': false, code: 'SA' },
            { 'key': '0', 'value': 'Sun', 'checked': false, code: 'SU' }
        ];

        const trainingPlan = {
            'name': 'New Plan',
            'count': 3,
            'trainingType': 'general',
            'gcalendar_id': '',
            'userID': req.session.passport.user,
            'isRemoved': false,
            'intervals': [],
            'exercisesList': [],
            'days': []
        };
        const trainingPlans = [];

        const planCount = 5;
        const dayCount = 3;
        const exerciseCount = 7;
        const setsCount = 4;

        for (let i = 1; i <= planCount; i++) {
            let newPlan = JSON.parse(JSON.stringify(trainingPlan));
            newPlan.name += '-' + i;
            trainingPlans.push(newPlan);
        }

        trainingPlans.forEach((plan) => {
            const daysIndexes = [];
            for (let i = 1; i <= dayCount; i++) {
                let index = Math.floor(Math.random() * days.length);
                while (daysIndexes.indexOf(index) !== -1){
                    index = Math.floor(Math.random() * days.length);
                }
                daysIndexes.push(index);
                const newDay = JSON.parse(JSON.stringify(days[index]));
                newDay.checked = true;
                plan.days.push(newDay);
            }
        });

        exerciseService.getAllExercises((err, exercises) => {
            trainingPlans.forEach((plan) => {
                const exercisesIndexes = [];
                for (let i = 1; i <= exerciseCount; i++) {
                    let index = Math.floor(Math.random() * exercises.length);
                    while (exercisesIndexes.indexOf(index) !== -1){
                        index = Math.floor(Math.random() * exercises.length);
                    }
                    exercisesIndexes.push(index);
                    const newExercise = {
                        'exercise': JSON.parse(JSON.stringify(exercises[index])),
                        'sets': []
                    };

                    for (let i = 1; i <= setsCount; i++) {
                        const newSet = {
                            'value': Math.floor(Math.random() * 80),
                            'value2': Math.floor(Math.random() * 20)
                        };
                        newExercise.sets.push(newSet);
                    }

                    plan.exercisesList.push(newExercise);
                }

                trainingPlanService.add(plan, function (err, data) {

                });
            });

            res.data = trainingPlans;
            res.error = err;
            next();
        });
    }, apiResponse);
};
