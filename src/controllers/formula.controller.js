const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { formulaService } = require('../services');

const createFormula = catchAsync(async (req, res) => {
  const formula = await formulaService.createFormula(req.body);
  res.status(httpStatus.CREATED).send(formula);
});

const getFormulas = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['key']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await formulaService.queryFormula(filter, options);
  res.send(result);
});

const getFormula = catchAsync(async (req, res) => {
  const Order = await formulaService.getFormulaById(req.params.formulaId);
  if (!Order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Formula not found');
  }
  res.send(Order);
});

const updateFormula = catchAsync(async (req, res) => {
  const order = await formulaService.updateFormulaById(req.params.formulaId, req.body);
  res.send(order);
});

module.exports = {
  createFormula,
  getFormulas,
  getFormula,
  updateFormula,
};
