const Joi = require('joi');

const getCoinsRates = {
  body: Joi.object().keys({}),
};

const createInvoice = {
  body: Joi.object().keys({
    coin: Joi.string().valid('BTC', 'LTC', 'BCH', 'DOGE', 'DASH', 'BNB', 'TCN').required(),
    amount: Joi.string().required(),
    fail_url: Joi.string().required(),
    success_url: Joi.string().required(),
    expire_time: Joi.string().required(),
  }),
};

const getInvoice = {
  body: Joi.object().keys({
    coin: Joi.string().valid('BTC', 'LTC', 'BCH', 'DOGE', 'DASH', 'BNB', 'TCN').required(),
    invoice_id: Joi.string().required(),
  }),
};

module.exports = {
  getCoinsRates,
  createInvoice,
  getInvoice,
};
