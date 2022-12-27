const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const FormulaSchema = mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
FormulaSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Formula = mongoose.model('Formula', FormulaSchema);

module.exports = Formula;
