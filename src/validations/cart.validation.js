const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCart = {
  body: Joi.object().keys({
    createdBy: Joi.string().required(),
    productId: Joi.string().required(),
    isRelodly: Joi.boolean().required(),
    isTopup: Joi.boolean().required(),
    quantity: Joi.number().required(),
  }),
};

const getCarts = {
  query: Joi.object().keys({
    createdBy: Joi.string(),
  }),
};

const getCart = {
  params: Joi.object().keys({
    cartId: Joi.string().custom(objectId),
  }),
};

const updateCart = {
  params: Joi.object().keys({
    cartId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      quantity: Joi.number(),
    })
    .min(1),
};

const deleteCart = {
  params: Joi.object().keys({
    cartId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCart,
  getCarts,
  getCart,
  updateCart,
  deleteCart,
};
