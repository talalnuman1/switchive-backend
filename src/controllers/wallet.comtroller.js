const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { walletService } = require('../services');

const createWallet = catchAsync(async (req, res) => {
  const Wallet = await walletService.createWallet(req.body);
  res.status(httpStatus.CREATED).send(Wallet);
});

const getWallets = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['createdBy']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await walletService.queryWallets(filter, options);
  res.send(result);
});

const getWallet = catchAsync(async (req, res) => {
  const Wallet = await walletService.getWalletById(req.params.walletId);
  if (!Wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }
  res.send(Wallet);
});

const updateWallet = catchAsync(async (req, res) => {
  const Wallet = await walletService.updateWalletById(req.params.walletId, req.body);
  res.send(Wallet);
});

const deleteWallet = catchAsync(async (req, res) => {
  await walletService.deleteWalletById(req.params.walletId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWallet,
  getWallets,
  getWallet,
  updateWallet,
  deleteWallet,
};
