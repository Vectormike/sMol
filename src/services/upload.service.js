/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const httpStatus = require('http-status');
const { Vendor, Item, Cart } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

const uploadVendorImage = async (userId, file) => {
  const { path } = file;
  try {
    const updatedImage = await Vendor.findByIdAndUpdate(
      userId,
      { vendorImageLink: path },
      {
        useFindAndModify: false,
      }
    );
    if (!updatedImage) {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Unable to upload image');
    }
    return updatedImage;
  } catch (error) {
    return error;
  }
};

const uploadItemImage = async (itemId, file) => {
  const { path } = file;
  try {
    const item = await Item.findByIdAndUpdate(itemId, { image: path }, { useFindAndModify: false }, { new: true });
    if (!item && item === null) {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Unable to upload image');
    }
    return item;
  } catch (error) {
    return error;
  }
};

module.exports = { uploadVendorImage, uploadItemImage };
