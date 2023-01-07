const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const redeemValidation = require('../../validations/redeeem.validation');
const redeemController = require('../../controllers/redeem.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('Redeem'), validate(redeemValidation.createRedeem), redeemController.createRedeem)
  .get(auth('Redeem'), validate(redeemValidation.getRedeems), redeemController.getRedeems);

router
  .route('/:redeemId')
  .get(auth('Redeem'), validate(redeemValidation.getRedeem), redeemController.getRedeem)
  .patch(auth('Redeem'), validate(redeemValidation.updateRedeem), redeemController.updateRedeem)
  .delete(auth('Redeem'), validate(redeemValidation.deleteRedeem), redeemController.deleteRedeem);

module.exports = router;
