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

const deleteBeautyZone = async (params) => {
  const { id } = params;
  try {
    await BeautyZone.findOneAndRemove(id, { useFindAndModify: false });
  } catch (error) {
    return error;
  }
};

module.exports = { createBeautyZone, getBeautyZones, deleteBeautyZone };
