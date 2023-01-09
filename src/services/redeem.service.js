const httpStatus = require('http-status');
const { Redeem } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Redeem
 * @param {Object} redeemBody
 * @returns {Promise<Redeem>}
 */
const createRedeem = async (redeemBody) => {
  return Redeem.create(redeemBody);
};

/**
 * Query for Redeems
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRedeems = async (filter, options) => {
  const Redeems = await Redeem.paginate(filter, options);
  return Redeems;
};

const getRedeem = async (req) => {
  const { page = 1, limit = 10 } = req.query;
  const p = Number(page);
  const l = Number(limit);
  const total = await Redeem.find().count();
  const results = await Redeem.aggregate([
    {
      $lookup: {
        from: 'switchivegiftcards',
        localField: 'productId',
        foreignField: '_id',
        as: 'card',
      },
    },
  ])
    .skip((p - 1) * l)
    .limit(l);
  const data = { totalResults: total, limit: l, page: p, results };
  return data;
};

/**
 * Get Redeem by id
 * @param {ObjectId} id
 * @returns {Promise<Redeem>}
 */
const getRedeemById = async (id) => {
  return Redeem.findById(id);
};

/**
 * Update Redeem by id
 * @param {ObjectId} redeemId
 * @param {Object} updateBody
 * @returns {Promise<Redeem>}
 */
const updateRedeemById = async (redeemId, updateBody) => {
  const RedeemToUPdate = await getRedeemById(redeemId);
  if (!RedeemToUPdate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Redeem not found');
  }
  Object.assign(RedeemToUPdate, updateBody);
  await RedeemToUPdate.save();
  return RedeemToUPdate;
};

/**
 * Delete Redeem by id
 * @param {ObjectId} redeemId
 * @returns {Promise<Redeem>}
 */
const deleteRedeemById = async (redeemId) => {
  const RedeemToDelete = await getRedeemById(redeemId);
  if (!RedeemToDelete) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Redeem not found');
  }
  await RedeemToDelete.remove();
  return RedeemToDelete;
};

module.exports = {
  createRedeem,
  queryRedeems,
  getRedeemById,
  updateRedeemById,
  deleteRedeemById,
  getRedeem,
};
