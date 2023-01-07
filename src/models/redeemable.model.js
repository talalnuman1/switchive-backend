const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const redeemSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'switchiveGiftCard',
      required: true,
    },
    isRedeemed: {
      type: Boolean,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    purchaseAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    paidCoin: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
redeemSchema.plugin(toJSON);
redeemSchema.plugin(paginate);

/**
 * @typedef Token
 */
const redeem = mongoose.model('redeem', redeemSchema);

module.exports = redeem;
