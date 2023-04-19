import logger from '../utils/logger.js';

function errorHandler(req, res) {
  logger.error('This endpoint does not exist');
  res.status(404).json({
    status: 404,
    message: "This endpoint doesn't exist!",
  });
}

export default errorHandler;
