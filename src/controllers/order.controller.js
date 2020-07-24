const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.user.id);
  res.status(httpStatus.CREATED).json({ order });
});

// const getBeautyZone = catchAsync(async (req, res) => {
//   const beautyzone = await beautyzoneService.getBeautyZones();
//   res.status(httpStatus.CREATED).json({ beautyzone });
// });

// const updateBeautyZone = catchAsync(async (req, res) => {
//   const beautyzone = await beautyzoneService.updateBeautyZone(req.params.id, req.body);
//   res.status(httpStatus.CREATED).json({ beautyzone });
// });

// const deleteBeautyZone = catchAsync(async (req, res) => {
//   await beautyzoneService.deleteBeautyZone(req.params);
//   res.status(httpStatus.OK).end();
// });

module.exports = { createOrder };
