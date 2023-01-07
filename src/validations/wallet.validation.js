const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createWallet = {
  body: Joi.object().keys({
    createdBy: Joi.string().required(),
    productId: Joi.string().required(),
    giftCardEmail: Joi.string().required(),
    howToRedeem: Joi.string().required(),
  }),
};

const getWallets = {
  query: Joi.object().keys({
    createdBy: Joi.string(),
  }),
};

const getWallet = {
  params: Joi.object().keys({
    walletId: Joi.string().custom(objectId),
  }),
};

const updateWallet = {
  params: Joi.object().keys({
    walletId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    createdBy: Joi.string(),
    productId: Joi.string(),
    giftCardEmail: Joi.string(),
    howToRedeem: Joi.string(),
  }),
};
const deleteWallet = {
  params: Joi.object().keys({
    walletId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createWallet,
  getWallets,
  getWallet,
  updateWallet,
  deleteWallet,
};
