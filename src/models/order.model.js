const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');


const orderSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    products: {
      type: Array,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    transaitionId: {
      type: Number,
      required: true,
      trim: true,
    },
    orderEmail: {
        type: String,
        trim: true,
      },
      country: {
        type: Object,
        required: true,
        trim: true,
      },
      paidBy: {
        type: String,
        trim: true,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);



orderSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const Order = mongoose.model('order', orderSchema);

module.exports = Order;
