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

const newPlan = [
    {
        '_id': '59a3d56d852e3764c84c9bd1',
        'name': 'New plan',
        'count': 3,
        'trainingType': 'general',
        'gcalendar_id': '8ccv08kp2qm9e0q6hmd6ok2hsc',
        'userID': '598dfbac7ee26330585b1413',
        '__v': 0,
        'isRemoved': false,
        'intervals': [],
        'exercisesList': [
            {
                'exercise': {
                    '_id': '59a3d2b9852e3764c84c9bc1',
                    'name': 'Seated Shoulder Presses',
                    'measure': 'weight',
                    'isRemoved': false,
                    'description': '1. Sit upright on bench with dumbbells over head. Make sure back is flat.\n\n2. Lower dumbbells slowly to shoulders.\n3. When arms are at 90 degrees, press the dumbbells back up and repeat.',
                    'image': './resources/exercise-image/5.gif',
                    'type': '59a3d2b8852e3764c84c9ba9',
                    '__v': 0,
                    'sportsId': []
                },
                '_id': '59a3d56d852e3764c84c9bd6',
                'sets': [
                    {
                        'value': '1',
                        'value2': '1',
                        '_id': '59a3d56d852e3764c84c9bd7'
                    }
                ]
            },
            {
                'exercise': {
                    '_id': '59a3d2b9852e3764c84c9bbd',
                    'name': 'Flat Chest Presses',
                    'measure': 'weight',
                    'isRemoved': false,
                    'description': '1. Lying flat on bench, hold the dumbbells directly above chest, arms extended.\n\n\n2. Lower dumbbells to chest in a controlled manner.\n3. Press dumbbells back to starting position and repeat.\n4. Avoid locking elbows',
                    'image': './resources/exercise-image/1.gif',
                    'type': '59a3d2b8852e3764c84c9ba9',
                    '__v': 0,
                    'sportsId': []
                },
                '_id': '59a3d56d852e3764c84c9bd4',
                'sets': [
                    {
                        'value': '1',
                        'value2': '2',
                        '_id': '59a3d56d852e3764c84c9bd5'
                    }
                ]
            },
            {
                'exercise': {
                    '_id': '59a3d2b9852e3764c84c9bd0',
                    'name': 'Triceps Kickbacks',
                    'measure': 'weight',
                    'isRemoved': false,
                    'description': '1. Stand upright next to bench. Place one arm and leg on bench. Upper body should be parallel to ground.\n2. Holding dumbbell raise elbow so upper arm is parallel to ground. Elbow should be bent at right angles.\n3. Extend elbow so entire arm is parallel to ground.\n4. Slowly return to start position and repeat for desired number of reps before changing arms.',
                    'image': './resources/exercise-image/20.gif',
                    'type': '59a3d2b8852e3764c84c9ba9',
                    '__v': 0,
                    'sportsId': []
                },
                '_id': '59a3d56d852e3764c84c9bd2',
                'sets': [
                    {
                        'value': '1',
                        'value2': '2',
                        '_id': '59a3d56d852e3764c84c9bd3'
                    }
                ]
            }
        ],
        'days': [
            {
                'key': '1',
                'value': 'Mon',
                'checked': true,
                'code': 'MO'
            },
            {
                'key': '3',
                'value': 'Wed',
                'checked': true,
                'code': 'WE'
            },
            {
                'key': '5',
                'value': 'Fri',
                'checked': true,
                'code': 'FR'
            }
        ]
    }
];
