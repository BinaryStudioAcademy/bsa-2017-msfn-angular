var mongoose = require('mongoose'),
    userRepository = require('../repositories/userRepository'),
    passportOAuthStrategyInit = require('../middleware/passportOAuthMiddleware')(),
    passportStrategyInit = require('../middleware/passportStrategyMiddleware').strategy(),
    adminData = {
        firstName: 'Arnold',
        lastName: 'Schwarzenegger',
        email: 'admin@msfn.com',
        password: 'bsa2017Angular',
        isCoach: true,
        isAdmin: true,
        position: 1
    }

module.exports = function () {
    userRepository.getUserByEmail(adminData.email, (err, data) => {
        if (err) {
            console.log('[InitService] - Error of initialize:' + err);
        } else if (data === null) {
            userRepository.add(adminData, (err, data) => {
                if (err) {
                    console.log('[InitService] - Error of adding:' + err);
                } else {
                    console.log('[InitService] - Admin added');
                }
            });
        } else {
            console.log('[InitService] - Admin are available');
        }
    })
    
}