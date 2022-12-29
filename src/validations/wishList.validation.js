const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createWishList = {
  body: Joi.object().keys({
    createdBy: Joi.string().required(),
    productId: Joi.string().required(),
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

const updateWishList = {
  params: Joi.object().keys({
    wishListId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    productId: Joi.string().required(),
  }),
};

const deleteWishList = {
  params: Joi.object().keys({ wishListId: Joi.required().custom(objectId) }),
};

module.exports = {
  createWishList,
  getWishLists,
  getWishList,
  updateWishList,
  deleteWishList,
};
