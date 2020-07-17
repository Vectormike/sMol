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

/**
 * Update Food by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateHomeService = async (userId, body) => {
  try {
    const homeService = await HomeService.findByIdAndUpdate(userId, body, {
      useFindAndModify: false,
      new: true,
    });
    if (!homeService) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Homeservice not updated');
    }
  } catch (error) {
    return error;
  }
};

const deleteHomeService = async (params) => {
  const { id } = params;
  try {
    await HomeService.findOneAndRemove(id, { useFindAndModify: false });
  } catch (error) {
    return error;
  }
};
module.exports = { createHomeService, getHomeService, updateHomeService, deleteHomeService };
