const httpStatus = require('http-status');
const { Cart, CartItem } = require('../models');
const ApiError = require('../utils/ApiError');

const createCart = async (itemBody) => {
  const cartItem = await CartItem.create(itemBody);
  const cart = await Cart.create({ ...itemBody, items: [cartItem._id] });
  return cart;
};

const getCart = async (id) => {
  const cart = await Cart.find({ userId: id });
  return cart;
};

const removeItemFromCart = async (id, user) => {
  try {
    await CartItem.findOneAndRemove(id, { useFindAndModify: false });
  } catch (error) {
    return error;
  }
};
module.exports = { createCart, getCart, removeItemFromCart };
