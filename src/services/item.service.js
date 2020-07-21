const httpStatus = require('http-status');
const { Item } = require('../models');
const ApiError = require('../utils/ApiError');

const getItems = async () => {
  const item = await Item.find().populate('vendorId');
  return item;
};

const getItemById = async (id) => {
  return Item.findById(id);
};

const createItem = async (itemBody) => {
  const item = await Item.create(itemBody);
  return item;
};

const updateItem = async (userId, body) => {
  try {
    const item = await Item.findByIdAndUpdate(userId, body, {
      useFindAndModify: false,
      new: true,
    });
    if (!item) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Item not updated');
    }
    return item;
  } catch (error) {
    return error;
  }
};

const deleteItem = async (params) => {
  const { id } = params;
  try {
    await Item.findOneAndRemove(id, { useFindAndModify: false });
  } catch (error) {
    return error;
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
