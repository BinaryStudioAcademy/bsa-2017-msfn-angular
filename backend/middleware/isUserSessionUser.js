module.exports = (req, res, next) => {
    if (req.params.id == req.session.passport.user) {
        return next();
    } else {
        return res.sendStatus(403).send('Permission denied');
    }
}
