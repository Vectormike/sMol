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
    vendorId: {
      type: String,
      ref: 'Vendor',
      required: true,
    },
    items: [{ name: String, image: String, description: String, quantity: String, price: String }],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingStatus: {
      type: String,
      enum: status,
      default: 'Pending',
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Order', orderSchema);
