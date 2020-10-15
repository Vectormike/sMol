const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { analyticsService } = require('../services');

const getVendorProductsCount = catchAsync(async (req, res) => {
  const productsCount = await analyticsService.getVendorProductsCount(req.user.id);
  res.json({ productsCount });
});

module.exports = { getVendorProductsCount };
