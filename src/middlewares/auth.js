import logger from '../utils/logger.js';

function requireUser(req, res, next) {
  const user = res.locals.user;
  if (!user) {
    logger.error('Login required');
    res.sendStatus(403).json({
      message: 'Login required',
    });
    return next();
  } else {
    return next();
  }
}

export default requireUser;
