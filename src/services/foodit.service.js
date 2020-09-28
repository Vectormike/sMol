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
const updateFood = async (userId, body) => {
  try {
    const food = await Foodit.findByIdAndUpdate(userId, body, {
      useFindAndModify: false,
      new: true,
    });
    if (!food) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Food not updated');
    }
  } catch (error) {
    return error;
  }
};

/**
 * Update Food items by id
 * @param {ObjectId} fooditId
 * @param {ObjectId} itemId
 * @param {Object} updateBody
 * @returns {Promise<Items>}
 */
const updateFoodItems = async (params, body) => {
  try {
    const { fooditId, itemId } = params;
    const { name, description, price, deliveryTime } = body;

    await Foodit.updateOne(
      { _id: fooditId, 'items._id': itemId },
      {
        $set: {
          'items.$.name': name,
          'items.$.price': price,
          'items.$.description': description,
          'items.$.deliveryTime': deliveryTime,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteFood = async (params) => {
  const { id } = params;
  try {
    await Foodit.findOneAndRemove(id, { useFindAndModify: false });
  } catch (error) {
    return error;
  }
};

module.exports = {
  createFood,
  getFoods,
  updateFood,
  updateFoodItems,
  deleteFood,
};
