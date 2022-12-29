const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { wishListService } = require('../services');

const createWishList = catchAsync(async (req, res) => {
  const wishlist = await wishListService.createWishList(req.body);
  res.status(httpStatus.CREATED).send(wishlist);
});

const getWishLists = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['createdBy']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await wishListService.queryWishList(filter, options);
  res.send(result);
});

const getWishList = catchAsync(async (req, res) => {
  const wishlist = await wishListService.getWishListById(req.params.wishListId);
  if (!wishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Formula not found');
  }
  res.send(wishlist);
});

const updateWishList = catchAsync(async (req, res) => {
  const wishlist = await wishListService.updateWishListById(req.params.wishListId, req.body);
  res.send(wishlist);
});

const deleteWishList = catchAsync(async (req, res) => {
  await wishListService.deleteWishListById(req.params.wishListId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWishList,
  getWishLists,
  getWishList,
  updateWishList,
  deleteWishList,
};
