import { verifyJWT } from '../utils/jwt.js';

async function deserializedToken(req, res, next) {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '');
  if (!accessToken) {
    return next();
  }
  const token = verifyJWT(accessToken);
  if (token.decoded) {
    res.locals.user = token.decoded;
    return next();
  }
  if (token.expired) {
    return next();
  }
  return next();
}

export default deserializedToken;
