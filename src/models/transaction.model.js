const mongoose = require('mongoose');

const { Schema } = mongoose;

const status = ['Paid', 'Refund'];

const transactionSchema = new Schema(
  {
    orderId: {
      type: String,
      ref: 'Order',
      required: true,
    },
    status: {
      type: String,
      enum: status,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    shippingAddress: {
      default: '',
      type: String,
    },
    paymentType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Transaction', transactionSchema);
