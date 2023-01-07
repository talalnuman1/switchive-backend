const httpStatus = require('http-status');
const { Wallet } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Wallet
 * @param {Object} walletBody
 * @returns {Promise<Wallet>}
 */
const createWallet = async (walletBody) => {
  return Wallet.create(walletBody);
};

/**
 * Query for Wallets
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryWallets = async (filter, options) => {
  const Wallets = await Wallet.paginate(filter, options);
  return Wallets;
};

/**
 * Get Wallet by id
 * @param {ObjectId} id
 * @returns {Promise<Wallet>}
 */
const getWalletById = async (id) => {
  return Wallet.findById(id);
};

/**
 * Update Wallet by id
 * @param {ObjectId} walletId
 * @param {Object} updateBody
 * @returns {Promise<Wallet>}
 */
const updateWalletById = async (walletId, updateBody) => {
  const WalletToUpdate = await getWalletById(walletId);
  if (!WalletToUpdate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }
  Object.assign(Wallet, updateBody);
  await WalletToUpdate.save();
  return WalletToUpdate;
};

/**
 * Delete Wallet by id
 * @param {ObjectId} walletId
 * @returns {Promise<Wallet>}
 */
const deleteWalletById = async (walletId) => {
  const WalletToDelete = await getWalletById(walletId);
  if (!WalletToDelete) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }
  await WalletToDelete.remove();
  return WalletToDelete;
};

module.exports = {
  createWallet,
  queryWallets,
  getWalletById,
  updateWalletById,
  deleteWalletById,
};
