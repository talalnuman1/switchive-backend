const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const formulaValidation = require('../../validations/formula.validation');
const formulaController = require('../../controllers/formula.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('formula'), validate(formulaValidation.createFormula), formulaController.createFormula)
  .get(auth('formula'), validate(formulaValidation.getFormulas), formulaController.getFormulas);

router
  .route('/:formulaId')
  .get(auth('formula'), validate(formulaValidation.getFormula), formulaController.getFormula)
  .patch(auth('formula'), validate(formulaValidation.updateFormula), formulaController.updateFormula)
  .delete(auth('formula'), validate(formulaValidation.deleteFormula), formulaController.deleteFormula);

module.exports = router;
