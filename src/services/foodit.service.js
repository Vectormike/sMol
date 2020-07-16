const httpStatus = require('http-status');
const { Foodit } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const { param } = require('../routes/v1/foodit.route');

const getFoods = async () => {
  const foods = await Foodit.find().populate('vendorId');
  return foods;
};

/**
 * Get Food by id
 * @param {ObjectId} id
 * @returns {Promise<Foodit>}
 */
const getFoodById = async (id) => {
  return Foodit.findById(id);
};

/**
 * Create a Food
 * @param {Object} foodBody
 * @returns {Promise<User>}
 */
const createFood = async (foodBody) => {
  const food = await Foodit.create(foodBody);
  return food;
};

/**
 * Update Food by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateFood = async (params, body) => {
  console.log(body);
  console.log(params);
  const food = await Foodit.findByIdAndUpdate(params.id, { ratings: body.ratings }, { new: true });
  console.log(food);
  if (!food) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Food not updated');
  }
};

const deleteFood = async (params) => {
  const { id } = params;
  try {
    await Foodit.findOneAndRemove(id);
  } catch (error) {
    return error;
  }
};

module.exports = {
  createFood,
  getFoods,
  updateFood,
  deleteFood,
};
