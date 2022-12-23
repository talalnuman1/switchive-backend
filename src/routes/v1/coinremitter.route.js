const express = require('express');
const validate = require('../../middlewares/validate');
const coinremitterValidation = require('../../validations/coinremitter.validation');
const coinremitterController = require('../../controllers/coinremitter.controller');

const router = express.Router();

router.route('/').get(validate(coinremitterValidation.getCoinsRates), coinremitterController.getCoinRates);

router.route('/createinvoice').post(validate(coinremitterValidation.createInvoice), coinremitterController.createInvoice);

router.route('/getinvoice').get(validate(coinremitterValidation.getInvoice), coinremitterController.getInvoice);

module.exports = router;
