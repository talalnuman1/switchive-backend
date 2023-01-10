const httpStatus = require('http-status');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  return Order.create(orderBody);
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
const queryOrder = async (filter, options) => {
  const order = await Order.paginate(filter, options);
  return order;
};

const getOrders = async (req) => {
  const { page = 1, limit = 10 } = req.query;
  const p = Number(page);
  const l = Number(limit);

  const total = await Order.find().count();

  const results = await Order.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'user',
      },
    },
  ])
    .skip((p - 1) * l)
    .limit(l);
  const data = { totalResults: total, limit: l, page: p, results };
  return data;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  return Order.findById(id);
};

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
  }
  await order.remove();
  return order;
};

module.exports = {
  createOrder,
  queryOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrders,
};
