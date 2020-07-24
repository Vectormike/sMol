const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    authorizationCode: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      required: true,
    },
    bin: {
      type: Number,
      required: true,
    },
    last4: {
      type: Number,
      required: true,
    },
    expMonth: {
      type: Number,
      required: true,
    },
    expYear: {
      type: Number,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Card', cardSchema);
