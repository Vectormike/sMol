const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const tokenService = require('./token.service');
const userService = require('./user.service');
const vendorService = require('./vendor.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');
const logger = require('../config/logger');

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginVendorWithEmailAndPassword = async (email, password) => {
  const vendor = await vendorService.getVendorByEmail(email);
  if (!vendor || !(await vendor.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return vendor;
};

/**
 * Refresh auth tokens for user
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, 'refresh');
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Refresh auth tokens for vendor
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshVendorAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, 'refresh');
    const vendor = await vendorService.getVendorById(refreshTokenDoc.user);
    if (!vendor) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateVendorAuthTokens(vendor);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (body) => {
  const { email } = body;
  const code = crypto.randomBytes(3).toString('hex');
  const hash = await bcrypt.hash(code, 8);
  const password = hash;
  try {
    const user = await userService.updateUserPasswordByEmail(email, password);
    if (!user) {
      throw new Error();
    }
    return { code, user };
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetVendorPassword = async (body) => {
  const { email } = body;
  const code = crypto.randomBytes(3).toString('hex');
  const hash = await bcrypt.hash(code, 8);
  const password = hash;
  try {
    const vendor = await vendorService.updateVendorPasswordByEmail(email, password);
    if (!vendor) {
      throw new Error();
    }
    return { code, vendor };
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Change password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const changePassword = async (user, body) => {
  const { _id } = user;
  try {
    const foundUser = await userService.getUserById(_id);
    if (!foundUser) {
      throw new Error('User not found');
    }
    const response = await bcrypt.compare(body.oldPassword, foundUser.password);
    if (!response) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
    }
    const hash = await bcrypt.hash(body.newPassword, 8);
    const updated = await User.findByIdAndUpdate({ _id }, { $set: { password: hash } }, { new: true });
    return updated;
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password update failed');
  }
};

/**
 * Change password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const changeVendorPassword = async (vendor, body) => {
  const { _id } = vendor;
  try {
    const foundVendor = await vendorService.getVendorById(_id);
    if (!foundVendor) {
      throw new Error('Vendor not found');
    }
    const response = await bcrypt.compare(body.oldPassword, foundVendor.password);
    if (!response) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
    }
    const hash = await bcrypt.hash(body.newPassword, 8);
    const updated = await User.findByIdAndUpdate({ _id }, { $set: { password: hash } }, { new: true });
    return updated;
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password update failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  loginVendorWithEmailAndPassword,
  refreshAuth,
  refreshVendorAuth,
  resetPassword,
  resetVendorPassword,
  changePassword,
  changeVendorPassword,
};
