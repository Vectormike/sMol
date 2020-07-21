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
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
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
