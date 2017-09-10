const mongoose = require('mongoose'),
    userRepository = require('../repositories/userRepository'),
    achievementsRepository = require('../repositories/achievementsRepository'),
    goalTypeService = require('../services/goalTypeService'),
    goalService = require('../services/goalService'),
    passportOAuthStrategyInit = require('../middleware/passportOAuthMiddleware')(),
    passportStrategyInit = require('../middleware/passportStrategyMiddleware').strategy(),
    measurementService = require('./measurementService'),
    exerciseLoadService = require('../services/exerciseLoadServices/exerciseLoadService'),
    exerciseImagesLoadService = require('../services/exerciseLoadServices/exerciseImagesLoadService'),
    exerciseTypeLoadService = require('../services/exerciseLoadServices/exerciseTypeLoadService'),

    adminData = {
        firstName: 'Arnold',
        lastName: 'Schwarzenegger',
        email: 'admin@msfn.com',
        password: 'qwerty',
        activateToken: '',
        isCoach: true,
        isAdmin: true,
        position: 1,
        birthday: '2001-9-11',
    },
    goalTypes = [
        'Weight',
        'Activity',
        'Food',
        'Appearance',
        'Improve results',
        'Others',
    ],
    goals = [
        {
            name: 'Lose weight',
            type: 'Weight',
        },
        {
            name: 'Increase weight',
            type: 'Weight',
        },
        {
            name: 'Burn calories',
            type: 'Activity',
        },
        {
            name: 'Run distance',
            type: 'Activity',
        },
        {
            name: 'Do some count of exercises',
            type: 'Activity',
        },
        {
            name: 'Do trainings count per week',
            type: 'Activity',
        },
        {
            name: 'Eat calories per day',
            type: 'Food',
        },
        {
            name: 'Gain muscles',
            type: 'Appearance',
        },
        {
            name: 'Beat your records',
            type: 'Improve results',
        }
    ],
    achievements = [
        {
            name: 'Student',
            message: 'Write first article',
            principle: 'f>v',
            value: 1,
            icon: './resources/achievements_icon/difficult_1.png',
            measureName: 'articles'
        },
        {
            name: 'Teacher',
            message: 'Write more 20 useful articles',
            principle: 'f>v',
            value: 20,
            icon: './resources/achievements_icon/difficult_2.png',
            measureName: 'articles'
        },
        {
            name: 'Sciencist',
            message: 'Write and post more 50 interest articles',
            principle: 'f>v',
            value: 50,
            icon: './resources/achievements_icon/difficult_3.png',
            measureName: 'articles'
        },
        {
            name: 'Homo Sapiens',
            message: 'Become famous among 10 friends',
            principle: 'f>v',
            value: 10,
            icon: './resources/achievements_icon/level_1.png',
            measureName: 'follower'
        },
        {
            name: 'Homo 2000',
            message: 'Have a more 50 subscribers',
            principle: 'f>v',
            value: 50,
            icon: './resources/achievements_icon/level_2.png',
            measureName: 'follower'
        },
        {
            name: 'Space Homo',
            message: 'Conquer the world, and become famous, have more 100 followers',
            principle: 'f>v',
            value: 100,
            icon: './resources/achievements_icon/level_3.png',
            measureName: 'follower'
        },
        {
            name: 'Little Groot',
            message: 'First steps in this app',
            principle: 'f>v',
            value: 0,
            icon: './resources/achievements_icon/older_1.png',
            measureName: 'day'
        },
        {
            name: 'Groot',
            message: 'Use our app one mounth',
            principle: 'f>v',
            value: 30,
            icon: './resources/achievements_icon/older_2.png',
            measureName: 'day'
        },
        {
            name: 'I\'m Groot',
            message: 'Be the user of our application more three month',
            principle: 'f>v',
            value: 120,
            icon: './resources/achievements_icon/older_3.png',
            measureName: 'day'
        },
        {
            name: 'Supermarket runner',
            message: 'Crossing first 100 meters',
            principle: 'f>v',
            value: 100,
            icon: './resources/achievements_icon/speed_1.png',
            measureName: 'distance'
        },
        {
            name: 'Sprinter',
            message: '1 km per training',
            principle: 'f>v',
            value: 1000,
            icon: './resources/achievements_icon/speed_2.png',
            measureName: 'distance'
        },
        {
            name: 'Marathon runner',
            message: 'Run for one workout more 41 km',
            principle: 'f>v',
            value: 41000,
            icon: './resources/achievements_icon/speed_3.png',
            measureName: 'distance'
        },
        {
            name: 'English gentleman',
            message: 'Do more than 5 workouts at the scheduled time',
            principle: 'f>v',
            value: 5,
            icon: './resources/achievements_icon/time_1.png',
            measureName: 'train'
        },
        {
            name: 'Watchmaker',
            message: 'Do more than 10 workouts at the scheduled time',
            principle: 'f>v',
            value: 10,
            icon: './resources/achievements_icon/time_2.png',
            measureName: 'train'
        },
        {
            name: 'Mr Sandman',
            message: 'Do more than 30 workouts at the scheduled time',
            principle: 'f>v',
            value: 30,
            icon: './resources/achievements_icon/time_3.png',
            measureName: 'train'
        },
    ],
    measurments = [
        {
            "measureName": "weight",
            "measureUnits": [
                { "conversionFactor": "1", "unitName": "kg", "unitType": "metric" },
                { "conversionFactor": "2.20462", "unitName": "lbs", "unitType": "imperial" }
            ]
        },
        {
            "measureName": "distance",
            "measureUnits": [
                { "conversionFactor": "1", "unitName": "km", "unitType": "metric" },
                { "conversionFactor": "1000", "unitName": "m", "unitType": "default" },
                { "conversionFactor": "39370.1", "unitName": "inches", "unitType": "imperial" }
            ]
        },
        {
            "measureName": "temperature",
            "measureUnits": [
                { "conversionFactor": "1", "unitName": "°C", "unitType": "metric" },
                { "conversionFactor": "32", "unitName": "°F", "unitType": "imperial" }
            ]
        },
        {
            "measureName": "timeFormat",
            "measureUnits": [
                { "conversionFactor": "1", "unitName": "24-hour clock", "unitType": "metric" },
                { "conversionFactor": "0.5", "unitName": "12-hour clock", "unitType": "imperial" }
            ]
        },
        {
            "measureName": "dateFormat",
            "measureUnits": [
                { "conversionFactor": "1", "unitName": "European (day.month.year)", "unitType": "metric" },
                { "conversionFactor": "1", "unitName": "American (month/day/year)", "unitType": "imperial" }
            ]
        },
        {
            "measureName": "startWeek",
            "measureUnits": [
                { "conversionFactor": "1", "unitName": "Monday", "unitType": "metric" },
                { "conversionFactor": "1", "unitName": "Sunday", "unitType": "imperial" }
            ]
        }
    ];
    exerciseRepository = require('./../repositories/exerciseRepository');
    exerciseTypeRepository = require('./../repositories/exerciseTypeRepository');

exercises = [
    {
        name: 'Flat Chest Presses',
        measure: 'weight',
        isRemoved: false,
        description: '1. Lying flat on bench, hold the dumbbells directly above chest, arms extended.\n\n\n' +
        '2. Lower dumbbells to chest in a controlled manner.\n3. Press dumbbells back to starting position and repeat.\n4. Avoid locking elbows',
        image: './resources/exercise-image/1.gif'
    },
    {
        name: 'Incline Chest Presses',
        measure: 'weight',
        isRemoved: false,
        description: '1. Adjust bench to an incline of 30 to 45 degrees.\n\n\n2. Repeat as above.',
        image: './resources/exercise-image/2.gif'
    },
    {
        name: 'Flat Chest Flies',
        measure: 'weight',
        isRemoved: false,
        description: '1. Lying flat on bench, hold dumbbells directly above chest.\n\n\n' +
        '2. Bend elbows slightly and maintain throughout the exercise.\n' +
        '3. Open arms to sides. Elbows should remain \'locked\' in a slightly flexed position.\n' +
        '4. When upper arms are parallel to floor, return the weights to the starting position and repeat.',
        image: './resources/exercise-image/3.gif'
    },
    {
        name: 'Incline Chest Flies',
        measure: 'weight',
        isRemoved: false,
        description: '1. Adjust bench to an incline of 30 to 45 degrees.\n\n' +
        '2. Repeat as above.',
        image: './resources/exercise-image/4.gif'
    },
    {
        name: 'Seated Shoulder Presses',
        measure: 'weight',
        isRemoved: false,
        description: '1. Sit upright on bench with dumbbells over head. Make sure back is flat.\n\n' +
        '2. Lower dumbbells slowly to shoulders.\n' +
        '3. When arms are at 90 degrees, press the dumbbells back up and repeat.',
        image: './resources/exercise-image/5.gif'
    },
    {
        name: 'Lateral Raises',
        measure: 'weight',
        isRemoved: false,
        description: '1. Stand upright, knees slightly bent, shoulder width apart, holding dumbbells at sides.\n' +
        '2. Bend elbows slightly and raise the dumbbells out to sides. Keep elbows slightly bent throughout.\n' +
        '3. When arms are parallel to floor, slowly lower back and repeat.',
        image: './resources/exercise-image/6.gif'
    },
    {
        name: 'Reverse Flies',
        measure: 'weight',
        isRemoved: false,
        description: '1. Sit on edge of bench, feet flat on the floor. Bend over so chest is almost resting on thighs.\n' +
        '2. Hold dumbbells next to feet and bend arms slightly. Open arms out keeping elbows bent.\n' +
        '3. When arms are parallel to floor, slowly lower dumbbells back.',
        image: './resources/exercise-image/7.gif'
    },
    {
        name: 'Front Raises',
        measure: 'weight',
        isRemoved: false,
        description: '1. Stand upright, knees slightly bent, shoulder width apart. Palms should be towards thighs.\n' +
        '2. Raise one dumbbell directly in front of you.\n' +
        '3. When arm is parallel to ground lower dumbbell slowly back. Repeat with the other arm.',
        image: './resources/exercise-image/8.gif'
    },
    {
        name: 'Dead Lifts',
        measure: 'weight',
        isRemoved: false,
        description: '1. Stand upright, feet shoulder width apart, knees slightly bent.\n' +
        '2. Bend lower back and knees to lower the weights down your legs. Back must remain flat, lower back should be arched inwards slightly. Keep head up throughout exercise.\n' +
        '3. Stand upright using lower back and legs, maintaining flat back and keeping your head up.',
        image: './resources/exercise-image/9.gif'
    },
    {
        name: 'Single Arm Row',
        measure: 'weight',
        isRemoved: false,
        description: '1. Stand upright next to bench. Place one knee and hand on bench. Upper body should be parallel to floor.\n' +
        '2. Hold one dumbbell with arm extended.\n' +
        '3. Raise dumbbell up to your midsection keeping back still throughout movement.\n' +
        '4. Slowly lower dumbbell to start position and repeat. After desired number of reps repeat for other arm.',
        image: './resources/exercise-image/10.gif'
    },
    {
        name: 'Lying Bent Over Rows',
        measure: 'weight',
        isRemoved: false,
        description: '1. Lie face down on a flat or slightly inclined bench. Hold two dumbbells and let arms hang down.\n' +
        '2. Pull dumbbells up towards chest.\n' +
        '3. Slowly lower dumbbells back down and repeat.',
        image: './resources/exercise-image/11.gif'
    },
    {
        name: 'Upright Rows',
        measure: 'weight',
        isRemoved: false,
        description: '1. Stand upright, feet shoulder width apart, knees slightly bent. \n' +
        '2. Keeping dumbbells close to body, raise them to chin.\n' +
        '3. Hold for a count of 2 and slowly lower to start position and repeat. ',
        image: './resources/exercise-image/12.gif'
    },
    {
        name: 'Shrugs',
        measure: 'weight',
        isRemoved: false,
        description: '1. Stand upright, feet shoulder width apart, knees slightly bent.\n' +
        '2. Keeping arms straight \'shrug\' shoulders as high as possible and hold for a count of 3.\n' +
        '3. Relax and repeat.\n' +
        '4. Do not roll shoulders backwards as you shrug up.',
        image: './resources/exercise-image/13.gif'
    },
    {
        name: 'Decline Seated Bicep Curls',
        measure: 'weight',
        isRemoved: false,
        description: '1. Adjust bench to a 45 degree incline.\n' +
        '2. Hold dumbbells at sides. Arms should be fully extended.\n' +
        '3. Keep elbows close to body and curl weight up by bending elblows.\n' +
        '4. Slowly lower dumbbells and repeat. ',
        image: './resources/exercise-image/14.gif'
    },
    {
        name: 'Hammer curls',
        measure: 'weight',
        isRemoved: false,
        description: '1. Stand upright with dumbells at sides.\n' +
        '2. Turn palms inward so they face body. \n' +
        '3. Curl dumbbells up slowly keeping your elbows close to sides. ',
        image: './resources/exercise-image/15.gif'
    },
    {
        name: 'Preacher Curls',
        measure: 'weight',
        isRemoved: false,
        description: '1. Set bench so back rest is approx 45 degrees.\n' +
        '2. Stand behind the bench. Holding dumbbell rest back of upper arm on back rest, arm fully extended.\n' +
        '3. Keep back of upper arm against back rest and curl dumbbell up towards face.\n' +
        '4. Slowly lower dumbbell until arm is not quite fully extended and repeat for desired number of reps before switching arms.',
        image: './resources/exercise-image/16.gif'
    },
    {
        name: 'Concentration Curls',
        measure: 'weight',
        isRemoved: false,
        description: '1. Sit on edge of bench with feet flat on the floor.\n' +
        '2. Holding dumbbell place elbow on inside of thigh, just above knee.\n' +
        '3. Curl dumbbell up towards your face. Do not swing back as you lift the weight.\n' +
        '4. Slowly lower the weight and repeat for desired number of reps before switching arms.',
        image: './resources/exercise-image/17.gif'
    },
    {
        name: 'Overhead Triceps Extensions',
        measure: 'weight',
        isRemoved: false,
        description: '1. Stand upright, feet shoulder width apart.\n' +
        '2. Hold dumbbell directly above head with arm fully extended. Clasp elbow with free hand for support.\n' +
        '3. Slowly let elbow fold so dumbbell is lowered behind head.\n' +
        '4. Extend arm back to starting position. Repeat for the desired number of reps and switch arms.',
        image: './resources/exercise-image/18.gif'
    },
    {
        name: 'French Presses',
        measure: 'weight',
        isRemoved: false,
        description: '1. Lie flat on bench. Hold dumbbells directly above chest with palms facing each other. Dumbbells should be just about touching each other.\n' +
        '2. Keeping your shoulders locked, let your elbows fold so dumbbells are lowered down to either side of head.\n' +
        '3. Extend both your arms back to start position and repeat.',
        image: './resources/exercise-image/19.gif'
    },
    {
        name: 'Triceps Kickbacks',
        measure: 'weight',
        isRemoved: false,
        description: '1. Stand upright next to bench. Place one arm and leg on bench. Upper body should be parallel to ground.\n' +
        '2. Holding dumbbell raise elbow so upper arm is parallel to ground. Elbow should be bent at right angles.\n' +
        '3. Extend elbow so entire arm is parallel to ground.\n' +
        '4. Slowly return to start position and repeat for desired number of reps before changing arms.',
        image: './resources/exercise-image/20.gif'
    }
];

exerciseTypeExample = {
    name: 'Dumbbell Exercises',
    isRemoved: false
};

module.exports = function () {
    // add exercises
    exerciseRepository.get({ limit: 1, filter: { isRemoved: false } }, (err, data) => {
        if (!data.length) {
            console.log('just load data');
            exerciseTypeLoadService.createAllTypes(function (err, data) {
                if (err) { console.log('[InitService] - Error of load exercises types'); }
                console.log('[InitService] - Exercises types added');
                exerciseLoadService.createAllExercises(function (err, data) {
                    if (err) { console.log('[InitService] - Error of load exercises'); }
                    console.log('[InitService] - Exercises added');
                    exerciseImagesLoadService.addImages(function (err, data) {
                        if (err) { console.log('[InitService] - Error of load exercises images'); }
                        console.log('[InitService] - Exercises images loaded');
                    });
                });
            });
        } else {
            console.log('[InitService] - Exercises are available');
        }

    });

    // add measurments
    measurementService.getAllMeasurements((err, data) => {
        if (err) {
            console.log('[InitService] - Error of initialize measurments:');
            console.log(err);
        } else if ((data === null) || (data.length !== measurments.length)) {
            measurments.forEach(function (element) {
                measurementService.createMeasurement(element, (err, data) => {
                    if (err) {
                        console.log('[InitService] - Error of adding measurments:');
                        console.log(err);
                    } else {
                        console.log('[InitService] - Measurments added');
                    }
                });
            })
        } else {
            console.log('[InitService] - Measurments are available');
        }
    })

    // add admin
    userRepository.getUserByEmail(adminData.email, (err, data) => {
        if (err) {
            console.log('[InitService] - Error of initialize admin:');
            console.log(err);
        } else if (data === null) {
            userRepository.add(adminData, (err, data) => {
                if (err) {
                    console.log('[InitService] - Error of adding admin:');
                    console.log(err);
                } else {
                    console.log('[InitService] - Admin added');
                }
            });
        } else {
            console.log('[InitService] - Admin are available');
        }

    });

    goalTypes.forEach((elem) => {
        goalTypeService.addGoalType(elem, () => { });
    });

    goals.forEach((elem) => {
        goalService.createGoal(elem, () => { });
    });
    achievementsRepository.getAll((err, data)=> {
        if (!data || !data.length){
            achievements.forEach((elem) => {
                achievementsRepository.add(elem, () => { });
            });
            console.log('[InitService] - Achievements added');
        } else {
            console.log('[InitService] - Achievements are available');
        }
    })

};
