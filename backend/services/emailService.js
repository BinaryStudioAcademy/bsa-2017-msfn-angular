const nodemailer = require('nodemailer');
const ApiError = require('./apiErrorService');
const emailConfig = require("../config/mail");

class emailService{

    constructor(){
        this.from = emailConfig.defaultSender;
        const smtpOptions = {
            service: emailConfig.service,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass
            }
        };

        this.transport = nodemailer.createTransport(smtpOptions);
    }

    send(params, callback){
        if (typeof params !== "object"){
            callback(new ApiError("Params must be object"));
        }
        params.from = this.from;
        this.transport.sendMail(params, callback);
    }
}

module.exports = new emailService();
