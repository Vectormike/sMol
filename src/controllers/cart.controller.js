const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cartService } = require('../services');

const createCart = catchAsync(async (req, res) => {
  const cart = await cartService.createCart({ ...req.body, userId: req.user.id });
  res.status(httpStatus.CREATED).json({ cart });
});

const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCart(req.user.id);
  res.json({ cart });
});

const removeItem = catchAsync(async (req, res) => {
  const cart = await cartService.removeItemFromCart(req.params.id, req.user.id);
  res.json({ cart });
});

module.exports = { createCart, getCart, removeItem };
