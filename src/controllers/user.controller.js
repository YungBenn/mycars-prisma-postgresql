import { PrismaClient } from '@prisma/client';
import {
  loginValidation,
  refreshTokenValidation,
  registerValidation,
} from '../middlewares/user.validation.js';
import logger from '../utils/logger.js';
import { checkPassword, hashing } from '../utils/bcrypt.js';
import { signJWT, verifyJWT } from '../utils/jwt.js';

const prisma = new PrismaClient();

export async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      include: {
        cars: true,
      },
    });
    logger.info('Success to get all users');
    res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (error) {
    logger.error(error);
    res.json({
      message: 'Something went error',
    });
  }
}

export async function registerUser(req, res) {
  const { error, value } = registerValidation(req.body);

  if (error) {
    logger.error(error);
    res.json({
      message: 'validation error',
    });
  } else {
    try {
      value.password = hashing(value.password);
      const user = await prisma.user.create({
        data: value,
      });
      logger.info('New user created');
      res.json(user);
    } catch (error) {
      logger.error(error);
      res.status(422).json({
        message: 'Failed to register',
      });
    }
  }
}

export async function loginUser(req, res) {
  const { value } = loginValidation(req.body);

  try {
    const user = await prisma.user.findFirst({
      where: { email: value.email },
    });
    const isValid = checkPassword(value.password, user.password);
    if (!isValid) {
      logger.error('Invalid email or password');
      res.status(404).json({
        message: 'Invalid email or password',
      });
    } else {
      const accessToken = signJWT({ ...user }, { expiresIn: '6h' });
      const refreshToken = signJWT({ ...user }, { expiresIn: '1d' });
      return res.status(200).send({
        message: 'Success register user',
        data: { accessToken, refreshToken },
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(422).json({
      message: 'Failed to login',
    });
  }
}

export async function refreshSession(req, res) {
  const { value } = refreshTokenValidation(req.body);
  try {
    const { decoded } = verifyJWT(value.refreshToken);
    const user = await prisma.user.findFirst({
      where: { email: decoded._doc.email },
    });
    if (!user) {
      return false;
    } else {
      const accessToken = signJWT(
        {
          ...user,
        },
        { expiresIn: '1d' },
      );
      return res.status(200).send({
        message: 'Refresh session success ',
        data: { accessToken },
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(422).json({
      message: 'Failed to refresh session',
    });
  }
}
