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

const emptyCart = async (id) => {
  const cart = await Cart.find({ userId: id });
  if (cart) {
    cart.items = [];
    cart.totalAmount = 0;
    const newCart = await cart.save();
    return newCart;
  }
  throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
};
module.exports = { createCart, getCart, emptyCart };
