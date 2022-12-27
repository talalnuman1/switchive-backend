const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFormula = {
  body: Joi.object().keys({
    key: Joi.string().required(),
    value: Joi.number().required(),
  }),
};

const getFormulas = {
  query: Joi.object().keys({
    key: Joi.string(),
  }),
};

const getFormula = {
  params: Joi.object().keys({
    formulaId: Joi.string().custom(objectId),
  }),
};

const updateFormula = {
  params: Joi.object().keys({
    formulaId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    value: Joi.number(),
  }),
};

const deleteFormula = {
  params: Joi.object().keys({ formulaId: Joi.required().custom(objectId) }),
};

module.exports = {
  createFormula,
  getFormulas,
  getFormula,
  updateFormula,
  deleteFormula,
};
