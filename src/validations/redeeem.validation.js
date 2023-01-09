const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRedeem = {
  body: Joi.object().keys({
    createdBy: Joi.string().required(),
    productId: Joi.string().required(),
    isRedeemed: Joi.boolean(),
    transactionId: Joi.string().required(),
    currency: Joi.string().valid('USD', 'GBP', 'EUR').required(),
    purchaseAmount: Joi.number().required(),
    paidAmount: Joi.number().required(),
    paidCoin: Joi.string().required(),
  }),
};

const getRedeems = {
  query: Joi.object().keys({
    createdBy: Joi.string(),
  }),
};

const getRedeem = {
  params: Joi.object().keys({
    redeemId: Joi.string().custom(objectId),
  }),
};

const updateRedeem = {
  params: Joi.object().keys({
    redeemId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    isRedeemed: Joi.boolean(),
  }),
};
const deleteRedeem = {
  params: Joi.object().keys({
    redeemId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createRedeem,
  getRedeems,
  getRedeem,
  updateRedeem,
  deleteRedeem,
};
