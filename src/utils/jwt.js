import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export function signJWT(payload, options) {
  return jwt.sign(payload, config.private_key, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, config.public_key);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    return {
      valid: false,
      expired: 'jwt is expired',
      decoded: null,
    };
  }
}
