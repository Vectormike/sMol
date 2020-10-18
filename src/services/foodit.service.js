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
 * Insert items into foodit by id
 * @param {ObjectId} fooditId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const addFoodItems = async (params, body) => {
  try {
    const { fooditId } = params;
    const { category, name, price, description, deliveryTime, image } = body;

    const food = await Foodit.findById(fooditId);
    const item = {
      category: category,
      name: name,
      price: price,
      image: image,
      description: description,
      deliveryTime: deliveryTime,
    };

    food.items.push(item);
    await food.save();

    return food;
  } catch (error) {
    return error;
  }
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
    const { category, name, description, price, deliveryTime, image, isAvailable } = body;

    await Foodit.updateOne(
      { _id: fooditId, 'items._id': itemId },
      {
        $set: {
          'items.$.category': category,
          'items.$.isAvailable': isAvailable,
          'items.$.name': name,
          'items.$.price': price,
          'items.$.description': description,
          'items.$.deliveryTime': deliveryTime,
          'items.$.image': image,
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

/**
 * Delete Food items by id
 * @param {ObjectId} fooditId
 * @param {ObjectId} itemId
 */
const deleteFoodItem = async (params, body) => {
  try {
    const { fooditId, itemId } = params;
    const food = await Foodit.findById(fooditId);
    // const index = food.items.findIndex((x) => x.id === itemId);
    food.items.pull(itemId);
    await food.save();
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  createFood,
  addFoodItems,
  getFoods,
  updateFood,
  updateFoodItems,
  deleteFoodItem,
  deleteFood,
};
