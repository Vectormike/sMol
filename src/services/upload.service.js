const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const vendorImageUpload = async (file) => {
  const { path } = file;
  try {
    const vendorImageLink = path;
    return vendorImageLink;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Image upload failed');
  }
};

const itemImageUpload = async (file) => {
  const { path } = file;
  try {
    const itemImageLink = path;
    return itemImageLink;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Image upload failed');
  }
};

module.exports = { vendorImageUpload, itemImageUpload };
