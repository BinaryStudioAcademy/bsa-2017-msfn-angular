function LogoutService() {

};

LogoutService.prototype.logout = logout;


function logout(req, res) {
    req.logout();
    res.send();
};

module.exports = new LogoutService();