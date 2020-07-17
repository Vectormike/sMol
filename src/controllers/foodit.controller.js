const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { fooditService } = require('../services');

const getFoods = catchAsync(async (req, res) => {
  const foodservice = await fooditService.getFoods();
  res.status(httpStatus.CREATED).json({ foodservice });
});

const createFood = catchAsync(async (req, res) => {
  const food = await fooditService.createFood({ ...req.body, vendorId: req.user._id });
  res.status(httpStatus.CREATED).json({ food });
});

const updateFood = catchAsync(async (req, res) => {
  const food = await fooditService.updateFood(req.user, req.body);
  res.status(httpStatus.CREATED).json({ food });
});

const deleteFood = catchAsync(async (req, res) => {
  await fooditService.deleteFood(req.params, req.body);
  res.status(httpStatus.OK).end();
});

module.exports = { createFood, getFoods, updateFood, deleteFood };
