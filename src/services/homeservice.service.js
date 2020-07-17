const httpStatus = require('http-status');
const { HomeService } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Food
 * @param {Object} foodBody
 * @returns {Promise<User>}
 */
const createHomeService = async (foodBody) => {
  const homeService = await HomeService.create(foodBody);
  return homeService;
};

const getHomeService = async () => {
  const homeService = await HomeService.find().populate('vendorId');
  return homeService;
};

const deleteHomeService = async (params) => {
  const { id } = params;
  try {
    await HomeService.findOneAndRemove(id, { useFindAndModify: false });
  } catch (error) {
    return error;
  }
};
module.exports = { createHomeService, getHomeService, deleteHomeService };
