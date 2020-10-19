const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.status(httpStatus.CREATED).json({ orders });
});

const getUserOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getUserOrders(req.user.id);
  res.status(httpStatus.CREATED).json({ orders });
});

const getVendorOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getVendorOrders(req.user.id);
  res.status(httpStatus.OK).json({ orders });
});

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.user.id);
  res.status(httpStatus.CREATED).json({ order });
});

const acceptOrder = catchAsync(async (req, res) => {
  const { orderDetails } = await orderService.acceptOrder(req.params.id);
  res.status(httpStatus.CREATED).json({ orderDetails });
});

const shipOrder = catchAsync(async (req, res) => {
  const order = await orderService.shipOrder(req.params.id);
  res.status(httpStatus.CREATED).json({ order });
});

const deliverOrder = catchAsync(async (req, res) => {
  const order = await orderService.deliverOrder(req.params.id);
  res.status(httpStatus.CREATED).json({ order });
});

const cancelOrder = catchAsync(async (req, res) => {
  const order = await orderService.cancelOrder(req.params.id);
  res.status(httpStatus.ACCEPTED).json({ order });
});

// const deleteBeautyZone = catchAsync(async (req, res) => {
//   await beautyzoneService.deleteBeautyZone(req.params);
//   res.status(httpStatus.OK).end();
// });

module.exports = {
  getAllOrders,
  getUserOrders,
  getVendorOrders,
  createOrder,
  acceptOrder,
  cancelOrder,
  shipOrder,
  deliverOrder,
};
