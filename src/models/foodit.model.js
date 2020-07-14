const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fooditSchema = mongoose.Schema(
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
fooditSchema.plugin(toJSON);
fooditSchema.plugin(paginate);

const Foodit = mongoose.model('User', fooditSchema);

module.exports = Foodit;
