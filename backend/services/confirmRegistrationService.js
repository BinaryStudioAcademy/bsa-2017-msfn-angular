const ApiError = require('./apiErrorService'),
    emailService = require('./emailService'),
    decrypt = require('./decryptService'),
    userRepository = require('../repositories/userRepository');


function ConfirmRegistrationService() {}

ConfirmRegistrationService.prototype.sendEmail = sendEmail;
ConfirmRegistrationService.prototype.confirmEmail = confirmEmail;

function sendEmail(code, callback) {
    const decodedEmail = decrypt(code),
        ourHost = 'http://localhost:3060/'


    emailService.send (
        {
            to: decodedEmail,
            subject: "Welcome to MSFN | Please finish your registration",
            html: `<h2>Go to link to finish your registration</h2>
                <a href="${ourHost}${code}"</a>`
        },
        (err, data) => {
            if (err) return callback(err);
            if (data.rejected.length == 0) {
                data.status = 'ok';
            }
            callback(null, data);
        }
    );
}

function confirmEmail(id, callback) {
    userRepository.getUserByEmail(decrypt(id), (err, user) => {
        if (err) {return callback(err)}

        userRepository.update(user._id, {isActivated: true}, (err, data) => {
            if (err) {return callback(err)};
            callback(null, data);
        });
    })
}

module.exports = new ConfirmRegistrationService();
