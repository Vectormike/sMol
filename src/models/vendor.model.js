const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const vendorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    // ratings: {
    //   type: Number,
    //   max: 5,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
vendorSchema.plugin(toJSON);
vendorSchema.plugin(paginate);

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
