const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const wishListSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Object,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    minAmount: {
      type: Number,
      required: true,
    },
    maxAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
wishListSchema.plugin(toJSON);
wishListSchema.plugin(paginate);

/**
 * @typedef Token
 */
const WishList = mongoose.model('WishList', wishListSchema);

module.exports = WishList;
