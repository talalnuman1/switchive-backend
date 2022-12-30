const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createWishList = {
  body: Joi.object().keys({
    createdBy: Joi.string().required(),
    productId: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.string().required(),
    minAmount: Joi.number().required(),
    maxAmount: Joi.number().required(),
    currency: Joi.string(),
    type: Joi.string().required(),
  }),
};

const getWishLists = {
  query: Joi.object().keys({
    createdBy: Joi.string(),
  }),
};

const getWishList = {
  params: Joi.object().keys({
    wishListId: Joi.string().custom(objectId),
  }),
};

const deleteWishList = {
  params: Joi.object().keys({ wishListId: Joi.required() }),
};

module.exports = {
  createWishList,
  getWishLists,
  getWishList,
  deleteWishList,
};
