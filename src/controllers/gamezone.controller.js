const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { gamezoneService } = require('../services');

const createGameZone = catchAsync(async (req, res) => {
  const gamezone = await gamezoneService.createGameZone({ ...req.body, vendorId: req.user._id });
  res.status(httpStatus.CREATED).json({ gamezone });
});

const getGameZone = catchAsync(async (req, res) => {
  const gamezone = await gamezoneService.getGameZones();
  res.status(httpStatus.CREATED).json({ gamezone });
});

const updateGameZone = catchAsync(async (req, res) => {
  const gamezone = await gamezoneService.updateBeautyZone(req.params.id, req.body);
  res.status(httpStatus.CREATED).json({ gamezone });
});

const deleteGameZone = catchAsync(async (req, res) => {
  await gamezoneService.deleteGameZone(req.params);
  res.status(httpStatus.OK).end();
});

module.exports = { createGameZone, getGameZone, updateGameZone, deleteGameZone };
