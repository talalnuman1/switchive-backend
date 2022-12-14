const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const FormulaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: Number,
      required: true,
    },
    sign: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
FormulaSchema.plugin(toJSON);
FormulaSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Formula = mongoose.model('Formula', FormulaSchema);

module.exports = Formula;
