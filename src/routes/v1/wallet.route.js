const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const walletValidation = require('../../validations/wallet.validation');
const walletController = require('../../controllers/wallet.comtroller');

const router = express.Router();

router
  .route('/')
  .post(auth('Wallet'), validate(walletValidation.createWallet), walletController.createWallet)
  .get(auth('Wallet'), validate(walletValidation.getWallets), walletController.getWallets);

router
  .route('/:walletId')
  .get(auth('Wallet'), validate(walletValidation.getWallet), walletController.getWallet)
  .patch(auth('Wallet'), validate(walletValidation.updateWallet), walletController.updateWallet)
  .delete(auth('Wallet'), validate(walletValidation.deleteWallet), walletController.deleteWallet);

module.exports = router;
