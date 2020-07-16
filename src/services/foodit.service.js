const httpStatus = require('http-status');
const { Foodit } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

/**
 * Get all Food
 * @returns {Promise<Foodits>}
 */
const getFoods = async () => {
  const foods = await Foodit.find();
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
const updateFoodById = async (updateBody) => {
  console.log(updateBody);
  const _id = mongoose.Types.ObjectId(updateBody.fooditID);
  const update = {};
  let updatedFood = await Foodit.findByIdAndUpdate(_id, { rate }, { new: true });

  if (!updatedFood) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Food not found');
  }

  Object.assign(updatedFood, updateBody);
  await updatedFood.save();
  return updatedFood;
};

module.exports = {
  createFood,
  getFoods,
  updateFoodById,
};
