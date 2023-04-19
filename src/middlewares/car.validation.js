import Joi from 'joi';

export function addCarValidation(payload) {
  const schema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    color: Joi.string().allow('', null),
    for_sale: Joi.boolean().required(),
    carOwner: Joi.string().required(),
  });
  return schema.validate(payload);
}

export function updateCarValidation(payload) {
  const schema = Joi.object({
    name: Joi.string().allow('', null),
    brand: Joi.string().allow('', null),
    color: Joi.string().allow('', null),
    for_sale: Joi.boolean().allow('', null),
    carOwner: Joi.string().allow('', null),
  });
  return schema.validate(payload);
}
