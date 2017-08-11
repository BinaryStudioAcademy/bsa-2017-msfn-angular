module.exports = (req, res, next) => {
    if (req.useragent.isIE || req.useragent.isEdge) {
        return res.sendFile('good-browsers.html', { root: __dirname+'/../static/' })
    } else {
        next();
    }
};
