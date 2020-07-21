const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const gamezone = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    ratings: {
      type: Number,
      max: 5,
      default: 0,
    },
    items: [
      {
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
