function requireUser(req, res, next) {
  const user = res.locals.user;
  if (!user) {
    res.sendStatus(403).json({
      message: 'Login required',
    });
    return next();
  }
  return next();
}

export default requireUser;
