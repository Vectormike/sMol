const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cartItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cartItem',
        required: true,
      },
    ],
    totalAmount: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Cart', CartSchema);
