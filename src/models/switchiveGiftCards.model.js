const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const switchiveGiftCArdSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
    },
    maxAmmount: {
      type: Number,
      required: true,
      trim: true,
    },
    minAmount: {
      type: Number,
      required: true,
      trim: true,
    },
    avatar: {
      type: Array,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
switchiveGiftCArdSchema.plugin(toJSON);
switchiveGiftCArdSchema.plugin(paginate);

switchiveGiftCArdSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const switchiveGiftCArd = mongoose.model('switchiveGiftCArd', switchiveGiftCArdSchema);

module.exports = switchiveGiftCArd;
