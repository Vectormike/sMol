const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const gamezone = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    vendorType: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      max: 5,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    items: [
      {
        isAvailable: {
          type: Boolean,
          default: true,
        },
        category: String,
        name: String,
        image: String,
        description: String,
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
gamezone.plugin(toJSON);
gamezone.plugin(paginate);

const Gamezone = mongoose.model('Gamezone', gamezone);

module.exports = Gamezone;
