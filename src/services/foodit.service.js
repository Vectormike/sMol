const httpStatus = require('http-status');
const { Foodit } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createFood = async (foodBody) => {
  const food = await Foodit.create(foodBody);
  return food;
};
const getFoods = async () => {
  const foods = await Foodit.find().populate("vendorId");
  return foods;
};
module.exports = {
  createFood,
  getFoods
};
