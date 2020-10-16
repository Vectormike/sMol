const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { analyticsService } = require('../services');

const analytics = catchAsync(async (req, res) => {
  const {
    productCount,
    ordersCount,
    newOrdersCount,
    acceptedOrdersCount,
    shippedOrdersCount,
    deliveredOrdersCount,
    cancelledOrders,
  } = await analyticsService.analytics(req.user.id);
  res.json({
    productCount,
    ordersCount,
    newOrdersCount,
    acceptedOrdersCount,
    shippedOrdersCount,
    deliveredOrdersCount,
    cancelledOrders,
  });
});

// const getVendorProductsCount = catchAsync(async (req, res) => {
//   const productsCount = await analyticsService.getVendorProductsCount(req.user.id);
//   res.json({ productsCount });
// });

// const getVendorOrdersCount = catchAsync(async (req, res) => {
//   const ordersCount = await analyticsService.getVendorOrdersCount(req.user.id);
//   res.json({ ordersCount });
// });

// const getNewVendorOrdersCount = catchAsync(async (req, res) => {
//   const newOrdersCount = await analyticsService.getNewVendorOrdersCount(req.user.id);
//   res.json({ newOrdersCount });
// });

// const getAcceptedVendorOrdersCount = catchAsync(async (req, res) => {
//   const acceptedOrdersCount = await analyticsService.getAcceptedVendorOrdersCount(req.user.id);
//   res.json({ acceptedOrdersCount });
// });

module.exports = {
  analytics,
  // getVendorProductsCount,
  // getVendorOrdersCount,
  // getNewVendorOrdersCount,
  // getAcceptedVendorOrdersCount,
};
