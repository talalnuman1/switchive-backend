const httpStatus = require('http-status');
const { switchiveGiftCard } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a switchiveGiftCard
 * @param {Object} switchiveGiftCardBody
 * @returns {Promise<switchiveGiftCard>}
 */
const createSwitchiveGiftCard = async (switchiveGiftCardBody) => {
  return switchiveGiftCard.create(switchiveGiftCardBody);
};

/**
 * Query for switchiveGiftCard
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySwitchiveGiftCard = async (filter, options) => {
  const SwitchiveGiftCard = await switchiveGiftCard.paginate(filter, options);
  return SwitchiveGiftCard;
};

/**
 * Get switchiveGiftCard by id
 * @param {ObjectId} id
 * @returns {Promise<switchiveGiftCard>}
 */
const getSwitchiveGiftCardById = async (id) => {
  return switchiveGiftCard.findById(id);
};

/**
 * Update switchiveGiftCard by id
 * @param {ObjectId} switchiveGiftCardId
 * @param {Object} updateBody
 * @returns {Promise<switchiveGiftCard>}
 */
const updateswitchiveGiftCardById = async (switchiveGiftCardId, updateBody) => {
  const card = await getSwitchiveGiftCardById(switchiveGiftCardId);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, 'switchive Gift Card not found');
  }
  Object.assign(card, updateBody);
  await card.save();
  return card;
};

/**
 * Delete switchiveGiftCard by id
 * @param {ObjectId} switchiveGiftCardId
 * @returns {Promise<switchiveGiftCard>}
 */
const deleteswitchiveGiftCardById = async (switchiveGiftCardId) => {
  const cardToDelete = await getSwitchiveGiftCardById(switchiveGiftCardId);
  if (!cardToDelete) {
    throw new ApiError(httpStatus.NOT_FOUND, 'switchiveGiftCard not found');
  }
  await cardToDelete.remove();
  return cardToDelete;
};

module.exports = {
  createSwitchiveGiftCard,
  querySwitchiveGiftCard,
  getSwitchiveGiftCardById,
  updateswitchiveGiftCardById,
  deleteswitchiveGiftCardById,
};
