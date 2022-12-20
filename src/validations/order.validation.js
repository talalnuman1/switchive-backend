const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    paidBy: Joi.string().valid('coinrem','depay'),
    products: Joi.array().required(),
    createdBy: Joi.string(),
    transaitionId: Joi.number().required(),
    orderEmail: Joi.string(),
    country: Joi.object().required(),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    createdBy: Joi.string(),

  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      products: Joi.array(),
    })
    .min(1),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
