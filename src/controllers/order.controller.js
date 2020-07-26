const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.user.id);
  res.status(httpStatus.CREATED).json({ order });
});

const refundOrder = catchAsync(async (req, res) => {
  await orderService.refundOrder(req.params.id);
  res.status(httpStatus.ACCEPTED);
});

const shipOrder = catchAsync(async (req, res) => {
  const order = await orderService.shipOrder(req.params.id);
  res.status(httpStatus.CREATED).json({ order });
});

// const deleteBeautyZone = catchAsync(async (req, res) => {
//   await beautyzoneService.deleteBeautyZone(req.params);
//   res.status(httpStatus.OK).end();
// });

module.exports = { createOrder, refundOrder, shipOrder };
