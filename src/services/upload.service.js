const httpStatus = require('http-status');
const { Vendor } = require('../models');
const ApiError = require('../utils/ApiError');

const imageUpload = async (file) => {
  const { path } = file;
  try {
    const imageLink = path;
    return imageLink;
  } catch (error) {
    return error;
  }
};

module.exports = { imageUpload };
