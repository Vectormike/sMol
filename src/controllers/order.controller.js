const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.status(httpStatus.CREATED).json({ orders });
});

const getOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getOrders();
  res.status(httpStatus.CREATED).json({ orders });
});

const getVendorOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getVendorOrders(req.params.vendorId);
  res.status(httpStatus.OK).json({ orders });
});

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.user.id);
  res.status(httpStatus.CREATED).json({ order });
});

const refundOrder = catchAsync(async (req, res) => {
  const order = await orderService.refundOrder(req.params.orderId);
  res.status(httpStatus.ACCEPTED).json({ order });
});

const shipOrder = catchAsync(async (req, res) => {
  const order = await orderService.shipOrder(req.params.id);
  res.status(httpStatus.CREATED).json({ order });
});

// const deleteBeautyZone = catchAsync(async (req, res) => {
//   await beautyzoneService.deleteBeautyZone(req.params);
//   res.status(httpStatus.OK).end();
// });

module.exports = { getAllOrders, getOrders, getVendorOrders, createOrder, refundOrder, shipOrder };
