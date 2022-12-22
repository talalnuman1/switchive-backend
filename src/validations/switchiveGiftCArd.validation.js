const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSwitchiveGiftCard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    currency: Joi.string().valid('USD', 'EURO', 'GBP').required(),
    maxAmmount: Joi.number().required(),
    minAmount: Joi.number().required(),
    avatar: Joi.array().required(),
  }),
};

const getSwitchiveGiftCards = {
  query: Joi.object().keys({
    name: Joi.string(),
  }),
};

const getSwitchiveGiftCard = {
  params: Joi.object().keys({
    switchiveGiftCardId: Joi.string().custom(objectId),
  }),
};

const updateSwitchiveGiftCard = {
  params: Joi.object().keys({
    switchiveGiftCardId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      currency: Joi.string().valid('USD', 'EURO', 'GBP'),
      maxAmmount: Joi.number(),
      minAmount: Joi.number(),
      avatar: Joi.array(),
    })
    .min(1),
};

const deleteSwitchiveGiftCard = {
  params: Joi.object().keys({
    switchiveGiftCardId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSwitchiveGiftCard,
  getSwitchiveGiftCards,
  getSwitchiveGiftCard,
  updateSwitchiveGiftCard,
  deleteSwitchiveGiftCard,
};
