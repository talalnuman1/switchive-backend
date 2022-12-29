const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const wishListValidation = require('../../validations/wishList.validation');
const wishListController = require('../../controllers/wishList.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('wishList'), validate(wishListValidation.createWishList), wishListController.createWishList)
  .get(auth('wishList'), validate(wishListValidation.getWishLists), wishListController.getWishLists);

router
  .route('/:wishListId')
  .get(auth('wishList'), validate(wishListValidation.getWishList), wishListController.getWishList)
  .delete(auth('wishList'), validate(wishListValidation.deleteWishList), wishListController.deleteWishList);

module.exports = router;
