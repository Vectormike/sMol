/* eslint-disable no-console */
/* eslint-disable import/order */
const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const Vendor = require('../models/vendor.model');
const paystack = require('paystack')(config.paystack);

/**
 * Create a user
 * @param {Object} vendorBody
 * @returns {Promise<User>}
 */
const createVendor = async (vendorBody) => {
  const { name, email, description, address, password, bank, accountNumber, businessName } = vendorBody;
  try {
    if (await Vendor.isEmailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const subaccountResponse = await paystack.subaccount.create({
      business_name: businessName,
      settlement_bank: bank,
      account_number: accountNumber,
      percentage_charge: 4,
    });
    if (subaccountResponse) {
      const vendor = await Vendor.create({
        name,
        email,
        description,
        address,
        password,
        bank,
        accountNumber,
        subaccountCode: subaccountResponse.data.subaccount_code,
      });
      return vendor;
    }
  } catch (error) {
    return error;
  }
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
  try {
    const vendor = await getVendorById(vendorId);
    if (!vendor) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Vendor not found');
    }
    if (updateBody.email && (await Vendor.isEmailTaken(updateBody.email, vendorId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    // const subaccountUpdateResponse = await paystack.subaccount.update({
    //   percentage_charge: 0,
    // });
    Object.assign(vendor, updateBody);
    await vendor.save();
    return vendor;
  } catch (error) {
    return error;
  }
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
