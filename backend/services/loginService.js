const ApiError = require('./apiErrorService');
const loginRepository = require('../repositories/loginRepository');

function LoginService() {

};

LoginService.prototype.login = login;

function login(req, res, next) {
  passport.authenticate('local',
    function(err, user, info) {
      return err 
        ? next(err)
        : user
          ? req.logIn(user, function(err) {
              return err
                ? next(err)
                : res.redirect('/private');
            })
          : res.redirect('/');
    }
  )(req, res, next);
};

module.exports = new LoginService()