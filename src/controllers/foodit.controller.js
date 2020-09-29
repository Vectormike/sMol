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

const addFoodItem = catchAsync(async (req, res) => {
  const food = await fooditService.addFoodItems(req.params, req.body);
  res.status(httpStatus.CREATED).json({ food });
});

const updateFood = catchAsync(async (req, res) => {
  const food = await fooditService.updateFood(req.params.id, req.body);
  res.status(httpStatus.CREATED).json({ food });
});

const updateFoodItems = catchAsync(async (req, res) => {
  const food = await fooditService.updateFoodItems(req.params, req.body);
  if (!food) {
    res.status(httpStatus.NOT_FOUND);
  }
  res.status(httpStatus.CREATED).json({ food });
});

const deleteFood = catchAsync(async (req, res) => {
  await fooditService.deleteFood(req.params, req.body);
  res.status(httpStatus.OK).end();
});

const deleteFoodItem = catchAsync(async (req, res) => {
  await fooditService.deleteFoodItem(req.params);
  res.status(httpStatus.OK).end();
});

module.exports = { createFood, addFoodItem, getFoods, updateFood, updateFoodItems, deleteFood, deleteFoodItem };
