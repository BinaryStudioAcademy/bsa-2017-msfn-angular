module.exports = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    } else if(req.user) {
          return res.send('Permission denied');
    } else {
        return res.redirect('/login', 403);
    }
}