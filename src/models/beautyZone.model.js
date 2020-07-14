const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const beautyZone = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Types.Schema.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    ratings: {
      type: Number,
      max: 5,
      default: 0,
    },
    items: [
      {
        name: String,
        description: String,
        price: Number,
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
beautyZone.plugin(toJSON);
beautyZone.plugin(paginate);

const BeautyZone = mongoose.model('BeautyZone', beautyZone);

module.exports = BeautyZone;
