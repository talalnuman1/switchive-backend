const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createWishList = {
  body: Joi.object().keys({
    createdBy: Joi.string().required(),
    product: Joi.object().required(),
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
  params: Joi.object().keys({ wishListId: Joi.required().custom(objectId) }),
};

module.exports = {
  createWishList,
  getWishLists,
  getWishList,
  deleteWishList,
};
