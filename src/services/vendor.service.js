const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const Vendor = require('../models/vendor.model');
const logger = require('../config/logger');
/**
 * Create a user
 * @param {Object} vendorBody
 * @returns {Promise<User>}
 */
const createVendor = async (vendorBody) => {
  if (await Vendor.isEmailTaken(vendorBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const vendor = await Vendor.create(vendorBody);
  return vendor;
};

/**
 * Get vendor by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getVendorById = async (id) => {
  return Vendor.findById(id);
};

/**
 * Get vendor by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getVendorByEmail = async (email) => {
  return Vendor.findOne({ email });
};

/**
 * Update vendor by id
 * @param {ObjectId} vendorId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateVendorById = async (vendorId, updateBody) => {
  const vendor = await getVendorById(vendorId);
  if (!vendor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await Vendor.isEmailTaken(updateBody.email, vendorId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(vendor, updateBody);
  await vendor.save();
  return vendor;
};

const updateVendorPasswordByEmail = async (email, password) => {
  return Vendor.findOneAndUpdate({ email }, { $set: { password } }, { new: true });
};

module.exports = {
  createVendor,
  getVendorById,
  getVendorByEmail,
  updateVendorById,
  updateVendorPasswordByEmail,
};
