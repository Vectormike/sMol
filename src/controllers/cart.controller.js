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

const emptyCart = catchAsync(async (req, res) => {
  const cart = await cartService.emptyCart(req.params.id, req.query.itemId);
  res.json({ cart });
});

module.exports = { createCart, getCart, emptyCart };
