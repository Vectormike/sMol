const httpStatus = require('http-status');
const { Vendor } = require('../models');
const ApiError = require('../utils/ApiError');

const uploadVendorImage = async (userId, file) => {
  try {
    const { url } = file;
    const updatedImage = await Vendor.findByIdAndUpdate(
      userId,
      { vendorImageLink: url },
      {
        useFindAndModify: false,
      }
    );
    if (!updatedImage) {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Unable to upload image');
    }
    return updatedImage;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { uploadVendorImage };
