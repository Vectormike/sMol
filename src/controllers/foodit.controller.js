const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { fooditService } = require('../services');

const createFood = catchAsync(async (req, res) => {
  const food = await fooditService.createFood(req.body);
  res.status(httpStatus.CREATED).json({ food });
});
const getFoods = catchAsync(async (req, res) => {
  const foods = await fooditService.getFoods();
  res.status(httpStatus.CREATED).json({ foods });
});

module.exports = { createFood, getFoods };
