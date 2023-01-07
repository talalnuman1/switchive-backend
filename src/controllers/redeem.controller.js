const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { redeemService } = require('../services');

const createRedeem = catchAsync(async (req, res) => {
  const Redeem = await redeemService.createRedeem(req.body);
  res.status(httpStatus.CREATED).send(Redeem);
});

const getRedeems = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['createdBy']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await redeemService.queryRedeems(filter, options);
  res.send(result);
});

const getRedeem = catchAsync(async (req, res) => {
  const Redeem = await redeemService.getRedeemById(req.params.redeemId);
  if (!Redeem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Redeem not found');
  }
  res.send(Redeem);
});

const updateRedeem = catchAsync(async (req, res) => {
  const Redeem = await redeemService.updateRedeemById(req.params.redeemId, req.body);
  res.send(Redeem);
});

const deleteRedeem = catchAsync(async (req, res) => {
  await redeemService.deleteRedeemById(req.params.redeemId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRedeem,
  getRedeems,
  getRedeem,
  updateRedeem,
  deleteRedeem,
};
