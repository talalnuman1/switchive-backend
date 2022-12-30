const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const switchiveGiftCardValidation = require('../../validations/switchiveGiftCArd.validation');
const switchiveGiftCardController = require('../../controllers/switchiveGiftCard.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('switchiveGiftCard'),
    validate(switchiveGiftCardValidation.createSwitchiveGiftCard),
    switchiveGiftCardController.createSwitchiveGiftCard
  )
  .get(
    auth('getswitchiveGiftCard'),
    validate(switchiveGiftCardValidation.getSwitchiveGiftCards),
    switchiveGiftCardController.getSwitchiveGiftCards
  );

router
  .route('/:switchiveGiftCardId')
  .get(
    auth('getswitchiveGiftCard'),
    validate(switchiveGiftCardValidation.getSwitchiveGiftCard),
    switchiveGiftCardController.getSwitchiveGiftCard
  )
  .patch(
    auth('switchiveGiftCard'),
    validate(switchiveGiftCardValidation.updateSwitchiveGiftCard),
    switchiveGiftCardController.updateSwitchiveGiftCard
  )
  .delete(
    auth('switchiveGiftCard'),
    validate(switchiveGiftCardValidation.deleteSwitchiveGiftCard),
    switchiveGiftCardController.deleteSwitchiveGiftCard
  );

module.exports = router;
