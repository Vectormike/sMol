const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fooditSchema = mongoose.Schema(
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
        name: String,
        description: String,
        price: Number,
        deliveryTime: String,
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

const Foodit = mongoose.model('Foodit', fooditSchema);

module.exports = Foodit;
