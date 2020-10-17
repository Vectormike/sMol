const httpStatus = require('http-status');
const { Order, BeautyZone, Foodit, Vendor, HomeService, GameZone } = require('../models');
const ApiError = require('../utils/ApiError');

const analytics = async (vendorId) => {
  try {
    const vendor = await Vendor.findById(vendorId);
    // console.log(vendor);
    let productCount;
    if (vendor.vendorType === 'foodservice') {
      const foodit = await Foodit.find({ vendorId });
      const { items } = foodit;
      // console.log(items);
      productCount = items.length;
    } else if (vendor.vendorType === 'homeservice') {
      const homeservice = await HomeService.find({ vendorId });
      const { items } = homeservice[0];
      // console.log(items);
      productCount = items.length;
    } else if (vendor.vendorType === 'beautyzone') {
      const beautyzone = await BeautyZone.find({ vendorId });
      const { items } = beautyzone[0];
      // console.log(items);
      productCount = items.length;
    } else if (vendor.vendorType === 'gamezone') {
      const gamezone = await GameZone.find({ vendorId });
      const { items } = gamezone[0];
      // console.log(items);
      productCount = items.length;
    }

    const orders = await Order.find({ vendorId });
    // console.log(orders.length);
    const ordersCount = orders.length;

    const newOrders = await Order.find({ vendorId }).where('shippingStatus').equals('Pending').exec();
    const newOrdersCount = newOrders.length;

    const acceptedOrders = await Order.find({ vendorId }).where('shippingStatus').equals('Accepted').exec();
    const acceptedOrdersCount = acceptedOrders.length;

    const shippedOrders = await Order.find({ vendorId }).where('shippingStatus').equals('Shipped').exec();
    const shippedOrdersCount = shippedOrders.length;

    const deliveredOrders = await Order.find({ vendorId: '5f7421d9525cc00022fe75cb' })
      .where('shippingStatus')
      .equals('Delivered')
      .exec();
    const deliveredOrdersCount = deliveredOrders.length;

    const cancelledOrders = await Order.find({ vendorId }).where('shippingStatus').equals('Cancelled').exec();

    const earnings = deliveredOrders.reduce((acc, currentValue) => acc + currentValue.totalAmount, 0);
    console.log(earnings);

    return {
      productCount,
      ordersCount,
      newOrders,
      newOrdersCount,
      acceptedOrders,
      acceptedOrdersCount,
      shippedOrders,
      shippedOrdersCount,
      deliveredOrders,
      deliveredOrdersCount,
      cancelledOrders,
      earnings,
    };
  } catch (error) {
    return error;
  }
};

// const getVendorProductsCount = async (vendorId) => {
//   try {
//     // console.log(vendorId);
//     const vendor = await Vendor.findById(vendorId);
//     console.log(vendor);
//     if (vendor.vendorType === 'foodservice') {
//       const foodit = await Foodit.find({ vendorId });
//       const { items } = foodit;
//       // console.log(items);
//       const productCount = items.length;
//       return productCount;
//     } else if (vendor.vendorType === 'homeservice') {
//       const homeservice = await HomeService.find({ vendorId });
//       const { items } = homeservice[0];
//       // console.log(items);
//       const productCount = items.length;
//       return productCount;
//     } else if (vendor.vendorType === 'beautyzone') {
//       const beautyzone = await BeautyZone.find({ vendorId });
//       const { items } = beautyzone[0];
//       // console.log(items);
//       const productCount = items.length;
//       return productCount;
//     } else if (vendor.vendorType === 'gamezone') {
//       const gamezone = await GameZone.find({ vendorId });
//       const { items } = gamezone[0];
//       // console.log(items);
//       const productCount = items.length;
//       return productCount;
//     }
//   } catch (error) {
//     return error;
//   }
// };

// const getVendorOrdersCount = async (vendorId) => {
//   // console.log(vendorId);
//   try {
//     const orders = await Order.find({ vendorId });
//     // console.log(orders.length);
//     const ordersCount = orders.length;
//     return ordersCount;
//   } catch (error) {
//     return error;
//   }
// };

// const getNewVendorOrdersCount = async (vendorId) => {
//   try {
//     const orders = await Order.find({ vendorId }).where('shippingStatus').equals('Pending').exec();
//     const newOrdersCount = orders.length;
//     // console.log(newOrdersCount);
//     return newOrdersCount;
//   } catch (error) {
//     return error;
//   }
// };

// const getAcceptedVendorOrdersCount = async (vendorId) => {
//   try {
//     const orders = await Order.find({ vendorId }).where('shippingStatus').equals('Accepted').exec();
//     const acceptedOrdersCount = orders.length;
//     // console.log(newOrdersCount);
//     return acceptedOrdersCount;
//   } catch (error) {
//     return error;
//   }
//};

module.exports = {
  analytics,
  // getVendorProductsCount,
  // getVendorOrdersCount,
  // getNewVendorOrdersCount,
  // getAcceptedVendorOrdersCount,
};
