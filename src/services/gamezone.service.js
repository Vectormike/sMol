const httpStatus = require('http-status');
const { GameZone } = require('../models');
const ApiError = require('../utils/ApiError');

const createGameZone = async (gamezoneBody) => {
  const gamezone = await BeautyZone.create(gamezoneBody);
  return gamezone;
};

const getGameZones = async () => {
  const gamezone = await GameZone.find().populate('vendorId');
  return gamezone;
};

const updateBeautyZone = async (userId, body) => {
  try {
    const gamezone = await GameZone.findByIdAndUpdate(userId, body, {
      useFindAndModify: false,
      new: true,
    });
    if (!gamezone) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Gamezone not updated');
    }
  } catch (error) {
    return error;
  }
};

const deleteGameZone = async (params) => {
  const { id } = params;
  try {
    await GameZone.findOneAndRemove(id, { useFindAndModify: false });
  } catch (error) {
    return error;
  }
};

module.exports = { createGameZone, getGameZones, updateBeautyZone, deleteGameZone };
