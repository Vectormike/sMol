const httpStatus = require('http-status');
const { Foodit } = require('../models');
const ApiError = require('../utils/ApiError');

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
// const updateFood = async (params, body) => {
//   try {
//     const { price, description, deliveryTime, ratings, name } = body;
//     // const { id } = query;
//     console.log(body);
//     console.log(params);
//     if (!name || !price || !description || !deliveryTime || !ratings) {
//       throw new Error('Unsuccessful');
//     }
//     const food = await Foodit.findByIdAndUpdate(
//       id,
//       { ratings, price, description, deliveryTime, name },
//       {
//         useFindAndModify: false,
//         new: true,
//       }
//     );
//     if (!food) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'Food not updated');
//     }
//   } catch (error) {
//     return error;
//   }
// };

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
  // updateFood,
  deleteFood,
};
