const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { gamezoneService } = require('../services');

const createGameZone = catchAsync(async (req, res) => {
  const gamezone = await gamezoneService.createGameZone({ ...req.body, vendorId: req.user._id });
  res.status(httpStatus.CREATED).json({ gamezone });
});

const getGameZones = catchAsync(async (req, res) => {
  const gamezone = await gamezoneService.getGameZones();
  res.status(httpStatus.CREATED).json({ gamezone });
});

const updateGameZone = catchAsync(async (req, res) => {
  const gamezone = await gamezoneService.updateGameZone(req.params.id, req.body);
  res.status(httpStatus.CREATED).json({ gamezone });
});

const deleteGameZone = catchAsync(async (req, res) => {
  await gamezoneService.deleteGameZone(req.params);
  res.status(httpStatus.OK).end();
});

module.exports = { createGameZone, getGameZones, updateGameZone, deleteGameZone };
