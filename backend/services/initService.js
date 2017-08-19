const mongoose = require('mongoose'),
    userRepository = require('../repositories/userRepository'),
    passportOAuthStrategyInit = require('../middleware/passportOAuthMiddleware')(),
    passportStrategyInit = require('../middleware/passportStrategyMiddleware').strategy(),
    measurementService = require('./measurementService'),
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
    measurments = [
        {
            "measureName": "weight",
            "measureUnits": [
                {"conversionFactor": "1", "unitName": "Kg", "unitType": "metric"},
                {"conversionFactor": "2.20462", "unitName": "Lbs", "unitType": "imperial"}
            ]
        },
        {
            "measureName": "distance",
            "measureUnits": [
                {"conversionFactor": "1", "unitName": "Km", "unitType": "metric"},
                {"conversionFactor": "1000", "unitName": "M", "unitType": "default"},
                {"conversionFactor": "39370.1", "unitName": "inches", "unitType": "imperial"}
            ]
        },
        {
            "measureName": "temperature",
            "measureUnits": [
                {"conversionFactor": "1", "unitName": "°C", "unitType": "metric"},
                {"conversionFactor": "32", "unitName": "°F", "unitType": "imperial"}
            ]
        },
        {
            "measureName": "timeFormat",
            "measureUnits": [
                {"conversionFactor": "1", "unitName": "24-hour clock" ,"unitType": "metric"},
                {"conversionFactor": "0.5", "unitName": "12-hour clock", "unitType": "imperial"}
            ]
        },
        {
            "measureName": "dateFormat",
            "measureUnits": [
                {"conversionFactor": "1", "unitName": "European (day.month.year)" , "unitType": "metric"},
                {"conversionFactor": "1", "unitName": "American (month/day/year)",  "unitType": "imperial"}
            ]
        },
        {
            "measureName": "startWeek",
            "measureUnits": [
                {"conversionFactor": "1", "unitName": "Monday", "unitType": "metric"},
                {"conversionFactor": "1", "unitName": "Sunday",  "unitType": "imperial"}
            ]
        }
    ]




module.exports = function () {
    // add measurments
    measurementService.getAllMeasurements((err, data) => {
        if (err) {
            console.log('[InitService] - Error of initialize measurments:');
            console.log(err);
        } else if (data.length !== measurments.length) {
            measurments.forEach(function(element) {
                measurementService.createMeasurement(element, (err, data) => {
                    if (err) {
                        console.log('[InitService] - Error of adding Measurments:');
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
    })
    
}
