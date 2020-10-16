const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const beautyZone = mongoose.Schema(
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
        category: String,
        isAvailable: {
          type: Boolean,
          default: true,
        },
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
beautyZone.plugin(toJSON);
beautyZone.plugin(paginate);

const BeautyZone = mongoose.model('BeautyZone', beautyZone);

module.exports = BeautyZone;
