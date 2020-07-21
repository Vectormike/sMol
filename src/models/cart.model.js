const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.'],
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Item', ItemSchema);

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    items: [ItemSchema],

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
