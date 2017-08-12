const ApiError = require('./apiErrorService');
const emailService = require('./emailService');
const userRepository = require('../repositories/userRepository');
const activateCodeRepository = require('../repositories/activateCodeRepository');

class activateService {

    constructor() {
        this.currentUserId = '5989ab5d64b3720631f3c350';
    }
    
    makeid() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
    
        for (let i = 0; i < 50; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    
        return text;
    }

}

module.exports = new activateService();
