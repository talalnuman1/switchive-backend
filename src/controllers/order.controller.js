const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService, userService, formulaService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const loyaltyPoints = await formulaService.getFormulaByKey('loyalty_points_percentage');
  const shpToUsd = await formulaService.getFormulaByKey('usd_to_shp');
  const referralPoints = await formulaService.getFormulaByKey('referral_points_percentage');
  const referralLimit = await formulaService.getFormulaByKey('referral_shp_limit');
  const order = await orderService.createOrder(req.body);
  const amount = parseFloat(req.body.amount);
  const cashBack = (loyaltyPoints.value / 100) * amount;
  const shp = cashBack / shpToUsd.value;
  const user = await userService.getUserById(req.user.id);
  if (user.referredBy) {
    const parentUser = await userService.getUserById(user.referredBy);
    const limit = referralLimit.value;
    if (user.loyaltyPoints / 2 <= 500) {
      const maxPoints = limit - user.loyaltyPoints / 2;
      if (shp / 2 > maxPoints) {
        parentUser.referralPoints += maxPoints;
      } else {
        parentUser.referralPoints += (referralPoints.value / 100) * shp;
      }
    }
    await parentUser.save();
  }
  user.loyaltyPoints += shp;
  await user.save();
  res.status(httpStatus.CREATED).send({ order, user: req.user });
});

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['createdBy']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrder(filter, options);
  res.send(result);
});

const getOrderByUser = catchAsync(async (req, res) => {
  const result = await orderService.getOrders(req);
  res.send(result);
});

const getOrder = catchAsync(async (req, res) => {
  const Order = await orderService.getOrderById(req.params.orderId);
  if (!Order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(Order);
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.orderId, req.body);
  res.send(order);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderByUser,
};
