const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { beautyzoneService } = require('../services');

const createBeautyZone = catchAsync(async (req, res) => {
  const beautyzone = await beautyzoneService.createBeautyZone({ ...req.body, vendorId: req.user._id });
  res.status(httpStatus.CREATED).json({ beautyzone });
});

const getBeautyZone = catchAsync(async (req, res) => {
  const beautyzone = await beautyzoneService.getBeautyZones();
  res.status(httpStatus.CREATED).json({ beautyzone });
});

const updateBeautyZone = catchAsync(async (req, res) => {
  const beautyzone = await beautyzoneService.updateBeautyZone(req.params.id, req.body);
  res.status(httpStatus.CREATED).json({ beautyzone });
});

const deleteBeautyZone = catchAsync(async (req, res) => {
  await beautyzoneService.deleteBeautyZone(req.params, req.body);
  res.status(httpStatus.OK).end();
});

module.exports = { createBeautyZone, getBeautyZone, updateBeautyZone, deleteBeautyZone };
