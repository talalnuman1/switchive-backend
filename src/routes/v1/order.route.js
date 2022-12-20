const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('order'), validate(orderValidation.createOrder), orderController.createOrder)
  .get(auth('order'), validate(orderValidation.getOrders), orderController.getOrders);

router
  .route('/:orderId')
  .get(auth('order'), validate(orderValidation.getOrder), orderController.getOrder)
  .patch(auth('order'), validate(orderValidation.updateOrder), orderController.updateOrder)
  .delete(auth('order'), validate(orderValidation.deleteOrder), orderController.deleteOrder);

module.exports = router;
