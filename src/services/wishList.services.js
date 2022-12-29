const httpStatus = require('http-status');
const { WishList } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a WishList
 * @param {Object} WishListBody
 * @returns {Promise<WishList>}
 */
const createWishList = async (WishListBody) => {
  return WishList.create(WishListBody);
};

/**
 * Query for WishList
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryWishList = async (filter, options) => {
  const wishList = await WishList.paginate(filter, options);
  return wishList;
};

/**
 * Get WishList by id
 * @param {ObjectId} id
 * @returns {Promise<WishList>}
 */
const getWishListById = async (id) => {
  return WishList.findById(id);
};

/**
 * Delete order by id
 * @param {ObjectId} wishListId
 * @returns {Promise<WishList>}
 */
const deleteWishListById = async (wishListId) => {
  const WishListToDelete = await getWishListById(wishListId);
  if (!WishListToDelete) {
    throw new ApiError(httpStatus.NOT_FOUND, 'WishList not found');
  }
  await WishListToDelete.remove();
  return WishListToDelete;
};

module.exports = {
  createWishList,
  queryWishList,
  getWishListById,
  deleteWishListById,
};
