const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { switchiveGiftCardService } = require('../services');

const createSwitchiveGiftCard = catchAsync(async (req, res) => {
  const switchiveGiftCard = await switchiveGiftCardService.createSwitchiveGiftCard(req.body);
  res.status(httpStatus.CREATED).send(switchiveGiftCard);
});

const getSwitchiveGiftCards = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await switchiveGiftCardService.querySwitchiveGiftCard(filter, options);
  res.send(result);
});

const getSwitchiveGiftCard = catchAsync(async (req, res) => {
  const switchiveGiftCard = await switchiveGiftCardService.getSwitchiveGiftCardById(req.params.switchiveGiftCardId);
  if (!switchiveGiftCard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'switchiveGiftCard not found');
  }
  res.send(switchiveGiftCard);
});

const updateSwitchiveGiftCard = catchAsync(async (req, res) => {
  const switchiveGiftCard = await switchiveGiftCardService.updateswitchiveGiftCardById(
    req.params.switchiveGiftCardId,
    req.body
  );
  res.send(switchiveGiftCard);
});

const deleteSwitchiveGiftCard = catchAsync(async (req, res) => {
  await switchiveGiftCardService.deleteswitchiveGiftCardById(req.params.switchiveGiftCardId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSwitchiveGiftCard,
  getSwitchiveGiftCards,
  getSwitchiveGiftCard,
  updateSwitchiveGiftCard,
  deleteSwitchiveGiftCard,
};
