/* eslint-disable no-console */
const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');

const createCart = async (cartBody) => {
  const cart = await Cart.create(cartBody);
  return cart;
};

const getCart = async (id) => {
  const cart = await Cart.find({ userId: id });
  return cart;
};

const emptyCart = async (cartId, itemId) => {
  try {
    const deletedItem = await Cart.findByIdAndUpdate(
      cartId,
      { $pull: { items: { _id: itemId } } },
      { safe: true, upsert: true, useFindAndModify: false },
      function (err) {
        if (err) console.log(err);
      }
    );
    if (!deletedItem) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Item not deleted');
    }
  } catch (error) {
    return error;
  }
};

module.exports = { createCart, getCart, emptyCart };
