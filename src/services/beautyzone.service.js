const httpStatus = require('http-status');
const { BeautyZone } = require('../models');
const ApiError = require('../utils/ApiError');

const createBeautyZone = async (beautyzoneBody) => {
  const beautyzone = await BeautyZone.create(beautyzoneBody);
  return beautyzone;
};

const getBeautyZones = async () => {
  const beautyzone = await BeautyZone.find().populate('vendorId');
  return beautyzone;
};

/**
 * Update Food by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateBeautyZone = async (userId, body) => {
  try {
    const beautyzone = await BeautyZone.findByIdAndUpdate(userId, body, {
      useFindAndModify: false,
      new: true,
    });
    if (!beautyzone) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Food not updated');
    }
  } catch (error) {
    return error;
  }
};

const deleteBeautyZone = async (params) => {
  const { id } = params;
  try {
    await BeautyZone.findOneAndRemove(id, { useFindAndModify: false });
  } catch (error) {
    return error;
  }
};

module.exports = { createBeautyZone, getBeautyZones, updateBeautyZone, deleteBeautyZone };
