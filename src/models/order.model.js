const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Order status
 */
const status = ['Pending', 'Shipped', 'Delivered', 'Cancelled', 'Refund'];

const orderSchema = new Schema(
  {
    cartId: {
      type: String,
      ref: 'Cart',
      required: true,
    },
    status: {
      type: String,
      enum: status,
      default: 'Pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Order', orderSchema);
