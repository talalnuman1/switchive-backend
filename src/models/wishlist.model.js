const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const wishListSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: String,
      required: true,
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
