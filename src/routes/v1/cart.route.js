const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cartValidation = require('../../validations/cart.validation');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('cart'), validate(cartValidation.createCart), cartController.createCart)
  .get(auth('cart'), validate(cartValidation.getCarts), cartController.getCarts);

router
  .route('/:cartId')
  .get(auth('cart'), validate(cartValidation.getCart), cartController.getCart)
  .patch(auth('cart'), validate(cartValidation.updateCart), cartController.updateCart)
  .delete(auth('cart'), validate(cartValidation.deleteCart), cartController.deleteCart);

module.exports = router;
