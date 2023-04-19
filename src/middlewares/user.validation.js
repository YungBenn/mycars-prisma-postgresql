import Joi from 'joi';

export function registerValidation(payload) {
  const schema = Joi.object({
    email: Joi.string().required(),
    phone: Joi.string().allow('', null),
    name: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(payload);
}

export function loginValidation(payload) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(payload);
}

export function refreshTokenValidation(payload) {
  const schema = Joi.object({
    refreshToken: Joi.string().required(),
  });
  return schema.validate(payload);
}
