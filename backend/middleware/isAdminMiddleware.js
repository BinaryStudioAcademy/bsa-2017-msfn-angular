exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
      return next();
  } else {
      return res.sendStatus(401).send('Permission denied');
  }
};