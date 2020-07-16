const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { fooditService } = require('../services');

const getFoods = catchAsync(async (req, res) => {
  const foods = await fooditService.getFoods();
  res.status(httpStatus.CREATED).json({ foods });
});

const createFood = catchAsync(async (req, res) => {
  const food = await fooditService.createFood(req.body);
  res.status(httpStatus.CREATED).json({ food });
});

const updateFood = catchAsync(async (req, res) => {
  console.log(req);
  const food = await fooditService.updateFoodById(req.body);
  res.status(httpStatus.CREATED).json({ food });
});

module.exports = { createFood, getFoods, updateFood };
