const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

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
    },
    vendorImageLink: { type: String },
    vendorType: {
      type: String,
    },
    fcmToken: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    bank: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    subaccountCode: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'vendor',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
vendorSchema.plugin(toJSON);
vendorSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
vendorSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const vendor = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!vendor;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
vendorSchema.methods.isPasswordMatch = async function (password) {
  const vendor = this;
  return bcrypt.compare(password, vendor.password);
};

vendorSchema.pre('save', async function (next) {
  const vendor = this;
  if (vendor.isModified('password')) {
    vendor.password = await bcrypt.hash(vendor.password, 8);
  }
  next();
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
