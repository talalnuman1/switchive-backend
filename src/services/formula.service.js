const httpStatus = require('http-status');
const { Formula } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createFormula = async (orderBody) => {
  return Formula.create(orderBody);
};

/**
 * Query for order
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFormula = async (filter, options) => {
  const formula = await Formula.paginate(filter, options);
  return formula;
};

/**
 * Get formula by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getFormulaById = async (id) => {
  return Formula.findById(id);
};
/**
 * Get formula by Key
 * @param {ObjectId} Key
 * @returns {Promise<Formula>}
 */

const getFormulaByKey = async (key) => {
  return Formula.findOne({
    key,
  });
};

/**
 * Update formula by id
 * @param {ObjectId} formulaId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateFormulaById = async (formulaId, updateBody) => {
  const formula = await getFormulaById(formulaId);
  if (!formula) {
    throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
  }
  Object.assign(formula, updateBody);
  await formula.save();
  return formula;
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteFormulaById = async (formulaId) => {
  const formula = await getFormulaById(formulaId);
  if (!formula) {
    throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
  }
  await formula.remove();
  return formula;
};

module.exports = {
  createFormula,
  queryFormula,
  getFormulaById,
  getFormulaByKey,
  updateFormulaById,
  deleteFormulaById,
};
