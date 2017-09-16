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
    foodTypeService = require('./foodTypeService'),
    foodService = require('./foodService'),

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
        registrationDate: '2017-07-01T21:00:00.000Z',
        comboCount: 0,
    },
    goalTypes = [
        'totalweight',
        'totaldistance',
        'changeweight',
        'combo',
        'followers',
        'launchedtrainings',
    ],
    goals = [
        {
            name: 'Lose weight',
            category: 'changeweight',
        },
        {
            name: 'Increase weight',
            category: 'changeweight',
        },
        {
            name: 'Raise some weight in total',
            category: 'totalweight',
        },
        {
            name: 'Run some distance in total',
            category: 'totaldistance',
        },
        {
            name: 'Launch some count of trainings',
            category: 'launchedtrainings',
        },
        {
            name: 'Open app some count of day in a row',
            category: 'combo',
        },
        {
            name: 'Get followers',
            category: 'followers',
        }
    ],
    achievements = [
        {
            name: 'Student',
            message: 'Write first article',
            hiddenMessage: 'Do you just check how it works?',
            principle: 'f>v',
            value: 1,
            icon: './resources/achievements_icon/difficult_1.png',
            measureName: 'articles'
        },
        {
            name: 'Teacher',
            message: 'Write more 20 useful articles',
            hiddenMessage: 'Cool writter start',
            principle: 'f>v',
            value: 20,
            icon: './resources/achievements_icon/difficult_2.png',
            measureName: 'articles'
        },
        {
            name: 'Sciencist',
            message: 'Write and post more 50 interest articles',
            hiddenMessage: 'Popular fitness writter',
            principle: 'f>v',
            value: 50,
            icon: './resources/achievements_icon/difficult_3.png',
            measureName: 'articles'
        },
        {
            name: 'Homo Sapiens',
            message: 'Become famous among 10 friends',
            hiddenMessage: 'Connect with your friends',
            principle: 'f>v',
            value: 10,
            icon: './resources/achievements_icon/level_1.png',
            measureName: 'follower'
        },
        {
            name: 'Homo 2000',
            message: 'Have a more 50 subscribers',
            hiddenMessage: 'You understand how it works',
            principle: 'f>v',
            value: 50,
            icon: './resources/achievements_icon/level_2.png',
            measureName: 'follower'
        },
        {
            name: 'Space Homo',
            message: 'Conquer the world, and become famous, have more 100 followers',
            hiddenMessage: 'You are really popular in this app',
            principle: 'f>v',
            value: 100,
            icon: './resources/achievements_icon/level_3.png',
            measureName: 'follower'
        },
        {
            name: 'Little Groot',
            message: 'First steps in this app',
            hiddenMessage: 'That`s just start of your trip!',
            principle: 'f>v',
            value: 0,
            icon: './resources/achievements_icon/older_1.png',
            measureName: 'day'
        },
        {
            name: 'Groot',
            message: 'Use our app one mounth',
            hiddenMessage: 'You grow up with us!',
            principle: 'f>v',
            value: 30,
            icon: './resources/achievements_icon/older_2.png',
            measureName: 'day'
        },
        {
            name: 'I\'m Groot',
            message: 'Be the user of our application more three month',
            hiddenMessage: 'Your life will not be the same',
            principle: 'f>v',
            value: 120,
            icon: './resources/achievements_icon/older_3.png',
            measureName: 'day'
        },
        {
            name: 'Supermarket runner',
            message: 'Crossing first 100 meters per training',
            hiddenMessage: 'Good start!',
            principle: 'f>v',
            value: 100,
            icon: './resources/achievements_icon/speed_1.png',
            measureName: 'distance'
        },
        {
            name: 'Sprinter',
            message: '1 km per training',
            hiddenMessage: 'That`s great result',
            principle: 'f>v',
            value: 1000,
            icon: './resources/achievements_icon/speed_2.png',
            measureName: 'distance'
        },
        {
            name: 'Marathon runner',
            message: 'Run for one workout more 41 km',
            hiddenMessage: 'You are real marathon runner!',
            principle: 'f>v',
            value: 41000,
            icon: './resources/achievements_icon/speed_3.png',
            measureName: 'distance'
        },
        {
            name: 'English gentleman',
            message: 'Do more than 5 workouts',
            hiddenMessage: 'Good job! Need more patience and a little effort',
            principle: 'f>v',
            value: 5,
            icon: './resources/achievements_icon/time_1.png',
            measureName: 'train'
        },
        {
            name: 'Watchmaker',
            message: 'Do more than 10 workouts',
            hiddenMessage: 'That`s right usage of app',
            principle: 'f>v',
            value: 10,
            icon: './resources/achievements_icon/time_2.png',
            measureName: 'train'
        },
        {
            name: 'Mr Sandman',
            message: 'Do more than 30 workouts',
            hiddenMessage: 'You know how to plan your life very competently',
            principle: 'f>v',
            value: 30,
            icon: './resources/achievements_icon/time_3.png',
            measureName: 'train'
        },
        {
            name: 'Lazy',
            message: 'Open the app everyday x5',
            hiddenMessage: 'Okay, let\'s pretend that you opened the application for a reason',
            principle: 'f>v',
            value: 5,
            icon: './resources/achievements_icon/comboDays_1.png',
            measureName: 'combodays'
        },
        {
            name: 'Serious',
            message: 'Open the app everyday x10',
            hiddenMessage: 'Hmmm .. We starting to trust you',
            principle: 'f>v',
            value: 10,
            icon: './resources/achievements_icon/comboDays_2.png',
            measureName: 'combodays'
        },
        {
            name: 'Pedant',
            message: 'Open the app everyday x30',
            hiddenMessage: 'From the beginning we had no doubt in you.',
            principle: 'f>v',
            value: 30,
            icon: './resources/achievements_icon/comboDays_3.png',
            measureName: 'combodays'
        },
        {
            name: 'Sratrtness',
            message: 'Lose 2kg',
            hiddenMessage: 'You are so light that it seems that you are only made up of air',
            principle: 'f>v',
            value: 2,
            icon: './resources/achievements_icon/loseWeight_1.png',
            measureName: 'loseweight'
        },
        {
            name: 'Middless',
            message: 'Lose 5kg',
            hiddenMessage: 'You begin to blow the wind like a balloon',
            principle: 'f>v',
            value: 5,
            icon: './resources/achievements_icon/loseWeight_2.png',
            measureName: 'loseweight'
        },
        {
            name: 'Stronger',
            message: 'Lose 10kg',
            hiddenMessage: 'You are weightless like a soap bubble',
            principle: 'f>v',
            value: 10,
            icon: './resources/achievements_icon/loseWeight_3.png',
            measureName: 'loseweight'
        },
        {
            name: 'Kilo',
            message: 'Total lift of all trainings 50 000 kg',
            hiddenMessage: 'Flutter like a butterfly pity like a bee',
            principle: 'f>v',
            value: 50 * 1000,
            icon: './resources/achievements_icon/totalWeight_1.png',
            measureName: 'totalweight'
        },
        {
            name: 'Mega',
            message: 'Total lift of all trainings 100 000 kg',
            hiddenMessage: 'Battle of titans its begin',
            principle: 'f>v',
            value: 100 * 1000,
            icon: './resources/achievements_icon/totalWeight_2.png',
            measureName: 'totalweight'
        },
        {
            name: 'Terra',
            message: 'Total lift of all trainings 200 000 kg',
            hiddenMessage: 'FATALITY!',
            principle: 'f>v',
            value: 200 * 1000,
            icon: './resources/achievements_icon/totalWeight_3.png',
            measureName: 'totalweight'
        },
        {
            name: 'Soilder',
            message: 'Total lift of one training 1 000 kg',
            hiddenMessage: 'Africnans Hercules',
            principle: 'f>v',
            value: 1000,
            icon: './resources/achievements_icon/trainWeight_1.png',
            measureName: 'trainweight'
        },
        {
            name: 'Major',
            message: 'Total lift of one training 5 000 kg',
            hiddenMessage: 'Indian Gilgamesh',
            principle: 'f>v',
            value: 5 * 1000,
            icon: './resources/achievements_icon/trainWeight_2.png',
            measureName: 'trainweight'
        },
        {
            name: 'General',
            message: 'Total lift of one training 10 000 kg',
            hiddenMessage: 'Greece Poseidon',
            principle: 'f>v',
            value: 10 * 1000,
            icon: './resources/achievements_icon/trainWeight_3.png',
            measureName: 'trainweight'
        },
        {
            name: 'Wind',
            message: 'Total cross of all trainings 20 000 m',
            hiddenMessage: 'Sum of all trainings you cross distance of one Paris city',
            principle: 'f>v',
            value: 20 * 1000,
            icon: './resources/achievements_icon/totalDistance_1.png',
            measureName: 'totaldistance'
        },
        {
            name: 'Soundwave',
            message: 'Total cross of all trainings 50 000 m',
            hiddenMessage: 'Sum of all trainings you cross distance of one Moscow city',
            principle: 'f>v',
            value: 50 * 1000,
            icon: './resources/achievements_icon/totalDistance_2.png',
            measureName: 'totaldistance'
        },
        {
            name: 'Light',
            message: 'Total cross of all trainings 100 000 m',
            hiddenMessage: 'Sum of all trainings you cross distance of one New York city',
            principle: 'f>v',
            value: 100 * 1000,
            icon: './resources/achievements_icon/totalDistance_3.png',
            measureName: 'totaldistance'
        },
        {
            name: 'Boyscout',
            message: 'Collect 25% of achievements',
            hiddenMessage: 'Great progress',
            principle: 'f>v',
            value: 0.25,
            icon: './resources/achievements_icon/achievementsCount_1.png',
            measureName: 'achieivcount'
        },
        {
            name: 'Collectionare',
            message: 'Collect 50% of achievements',
            hiddenMessage: 'Half of way done',
            principle: 'f>v',
            value: 0.5,
            icon: './resources/achievements_icon/achievementsCount_2.png',
            measureName: 'achieivcount'
        },
        {
            name: 'God',
            message: 'Collect 100% of achievements',
            hiddenMessage: 'Are you kidding???',
            principle: 'f>v',
            value: 1,
            icon: './resources/achievements_icon/achievementsCount_3.png',
            measureName: 'achieivcount'
        },
        {
            name: 'Wish-maker',
            message: 'Complete all plans of the week',
            hiddenMessage: 'Good week, you done all your plans. Do you have some secret?',
            principle: 'f>v',
            value: 1,
            icon: './resources/achievements_icon/perfectWeek.png',
            measureName: 'perfectweek'
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

foodTypes1 = [
    {
        name: 'Fruits && Vegetables',
        depthLvl: 1
    },
    {
        name: 'Meat && Fish',
        depthLvl: 1
    },
    {
        name: 'Drocery',
        depthLvl: 1
    },
    {
        name: 'Dairy',
        depthLvl: 1
    },
    {
        name: 'Desserts',
        depthLvl: 1
    }];

foodTypes2 = [
    {
        name: 'Pasta',
        depthLvl: 2,
        parentType: 'Drocery'
    },
    {
        name: 'Grains',
        depthLvl: 2,
        parentType: 'Drocery'
    },
    {
        name: 'Fruits',
        depthLvl: 2,
        parentType: 'Fruits && Vegetables'
    },
    {
        name: 'Vegetables',
        depthLvl: 2,
        parentType: 'Fruits && Vegetables'
    },
    {
        name: 'Berries',
        depthLvl: 2,
        parentType: 'Fruits && Vegetables'
    },
    {
        name: 'Meat',
        depthLvl: 2,
        parentType: 'Meat && Fish'
    },
    {
        name: 'Seafood',
        depthLvl: 2,
        parentType: 'Meat && Fish'
    },
    {
        name: 'Milk',
        depthLvl: 2,
        parentType: 'Dairy'
    },
    {
        name: 'Cheese',
        depthLvl: 2,
        parentType: 'Dairy'
    },
];

foodList = [
    {
        name: 'Asparagus',
        foodType: 'Vegetables',
        kcal: 40,
        protein: 2,
        fat: 0,
        carbons: 3,
        vendor: 'Kroger',
        description: 'Asparagus is one of the top-20 foods listed on the Aggregate Nutrient Density Index (ANDI). The index aims to give an idea of the overall health benefit of foods by measuring vitamin, mineral, and phytonutrient content in relation to the caloric content.',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-asparagus.png',
    },
    {
        name: 'Avocado',
        foodType: 'Fruits',
        kcal: 160,
        protein: 8.5,
        fat: 14.7,
        carbons: 3,
        vendor: 'Usda',
        description: 'Avocados are high in antioxidants and many important nutrients, some of which are rare in the modern diet. For this reason, it is not surprising to see that avocados have numerous health benefits.',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-avocado.png',
    },
    {
        name: 'Bacon',
        foodType: 'Meat',
        kcal: 40,
        protein: 2.5,
        fat: 3.5,
        carbons: 0.5,
        vendor: 'Bacon',
        description: '',
        measure: 'Quantity',
        isPublished: true,
        picture: 'resources/food/icons8-bacon.png',
    },
    {
        name: 'Banana split',
        foodType: 'Desserts',
        kcal: 141,
        protein: 2.4,
        fat: 3.5,
        carbons: 26,
        vendor: 'Dairy Queen',
        description: 'This fun dessert is a healthy, kid-friendly spin on a classic.',
        measure: 'Quantity',
        isPublished: true,
        picture: 'resources/food/icons8-banana_split.png',
    },
    {
        name: 'Strawberry',
        foodType: 'Berries',
        kcal: 32,
        protein: 0.7,
        fat: 0.3,
        carbons: 0.7,
        vendor: 'Strawberry',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-berry.png',
    },
    {
        name: 'Broccoli',
        foodType: 'Vegetables',
        kcal: 34,
        protein: 2.8,
        fat: 0.4,
        carbons: 6.6,
        vendor: 'Broccoli',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-broccoli.png',
    },
    {
        name: 'Cheese cheddar',
        foodType: 'Cheese',
        kcal: 406,
        protein: 24,
        fat: 33.8,
        carbons: 1.3,
        vendor: 'Trader Joe\'s',
        description: 'Cheddar cheese is a go-to snack, but it also has a well-deserved place in grilled cheese sandwiches, macaroni and cheese, nachos, chili, and so much more. So it was high time we took a trip to the store and tested all the big brands of cheddar we could find.',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-cheese.png',
    },
    {
        name: 'Cherry',
        foodType: 'Berries',
        kcal: 50,
        protein: 0,
        fat: 0.3,
        carbons: 12,
        vendor: 'Cherry tree',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-cherry.png',
    },
    {
        name: 'Cucumber',
        foodType: 'Vegetables',
        kcal: 12,
        protein: 0.6,
        fat: 0.2,
        carbons: 2.2,
        vendor: 'Garden',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-cucumber.png',
    },
    {
        name: 'Cupcake',
        foodType: 'Desserts',
        kcal: 200,
        protein: 2,
        fat: 6,
        carbons: 35,
        vendor: 'Cupcake',
        description: '',
        measure: 'Quantity',
        isPublished: true,
        picture: 'resources/food/icons8-cupcake.png',
    },
    {
        name: 'Doughnut',
        foodType: 'Desserts',
        kcal: 260,
        protein: 3,
        fat: 14,
        carbons: 31,
        vendor: 'Simpson production',
        description: '',
        measure: 'Quantity',
        isPublished: true,
        picture: 'resources/food/icons8-doughnut.png',
    },
    {
        name: 'Perch',
        foodType: 'Seafood',
        kcal: 100,
        protein: 23,
        fat: 2,
        carbons: 0,
        vendor: 'Mariano\'s',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-fish_food.png',
    },
    {
        name: 'Ice cream',
        foodType: 'Desserts',
        kcal: 120,
        protein: 2,
        fat: 7,
        carbons: 13,
        vendor: 'Baskin robbins',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-ice_cream_bowl.png',
    },
    {
        name: 'Milk',
        foodType: 'Milk',
        kcal: 60,
        protein: 4.2,
        fat: 2.1,
        carbons: 6,
        vendor: 'Milka',
        description: '',
        measure: 'Liquid',
        isPublished: true,
        picture: 'resources/food/icons8-milk_bottle.png',
    },
    {
        name: 'Champignons',
        foodType: 'Vegetables',
        kcal: 16,
        protein: 2.7,
        fat: 0,
        carbons: 0.3,
        vendor: 'VWT',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-mushroom.png',
    },
    {
        name: 'Noodles',
        foodType: 'Pasta',
        kcal: 352,
        protein: 12.3,
        fat: 1.75,
        carbons: 74,
        vendor: 'Mivina',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-noodles.png',
    },
    {
        name: 'Octopus grilled',
        foodType: 'Seafood',
        kcal: 82,
        protein: 15,
        fat: 1,
        carbons: 2.2,
        vendor: 'Octopus',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-octopus.png',
    },
    {
        name: 'Porridge',
        foodType: 'Grains',
        kcal: 355,
        protein: 11,
        fat: 8,
        carbons: 60,
        vendor: 'Axa',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-porridge.png',
    },
    {
        name: 'Prawn',
        foodType: 'Seafood',
        kcal: 67,
        protein: 21,
        fat: 1,
        carbons: 0,
        vendor: 'Prawn',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-prawn.png',
    },
    {
        name: 'Raspberry',
        foodType: 'Berries',
        kcal: 52,
        protein: 1.2,
        fat: 0.6,
        carbons: 12,
        vendor: 'Raspberry',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-raspberry.png',
    },
    {
        name: 'Rice',
        foodType: 'Grains',
        kcal: 97,
        protein: 2,
        fat: 0.2,
        carbons: 21.1,
        vendor: 'Rice',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-rice_bowl.png',
    },
    {
        name: 'Salmon',
        foodType: 'Seafood',
        kcal: 100,
        protein: 20.9,
        fat: 1,
        carbons: 2,
        vendor: 'Norven',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-sashimi.png',
    },
    {
        name: 'Spaghetti',
        foodType: 'Pasta',
        kcal: 220,
        protein: 6,
        fat: 1,
        carbons: 42,
        vendor: 'Pasta La Vista!',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-spaghetti.png',
    },
    {
        name: 'Steak',
        foodType: 'Meat',
        kcal: 212,
        protein: 14.6,
        fat: 5,
        carbons: 1.2,
        vendor: 'Steak',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-steak.png',
    },
    {
        name: 'Turkey',
        foodType: 'Meat',
        kcal: 123,
        protein: 16.3,
        fat: 4.3,
        carbons: 3.7,
        vendor: 'thanksgiving',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-thanksgiving.png',
    },
    {
        name: 'Tomato',
        foodType: 'Vegetables',
        kcal: 18,
        protein: 0.9,
        fat: 0.2,
        carbons: 3.9,
        vendor: 'Garden',
        description: '',
        measure: 'Weight',
        isPublished: true,
        picture: 'resources/food/icons8-tomato.png',
    },
];


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
    });

    foodTypeService.getFoodTypeByName(foodTypes1[0].name, (err, data) => {
        
        if (data.length === 0) {
            foodTypeService.addAll(foodTypes1, (err, data) => {
                let types = data.types;
                foodTypes2.forEach((el, ind) => {
                    let parent = types.find((created)=>{
                        return el.parentType === created.name;
                    });
                    el.parentType = parent._id;
                });
                foodTypeService.addAll(foodTypes2, (err, data2) => {
                    types = types.concat(data2.types);
                    foodList.forEach((el, ind) => {
                        let parent = types.find((created)=>{
                            return el.foodType === created.name;
                        });
                        el.foodType = parent._id;
                    });
                    foodService.addAll(foodList, (err, dataFood)=>{
                        console.log(dataFood);
                    });
                });
            });

        }
    });



};
