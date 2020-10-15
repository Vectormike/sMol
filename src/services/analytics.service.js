const httpStatus = require('http-status');
const { Order, BeautyZone, Foodit, Vendor, HomeService, GameZone } = require('../models');
const ApiError = require('../utils/ApiError');

const getVendorProductsCount = async (vendorId) => {
  try {
    // console.log(vendorId);
    const vendor = await Vendor.findById(vendorId);
    console.log(vendor);
    if (vendor.vendorType === 'foodservice') {
      const foodit = await Foodit.find({ vendorId });
      const { items } = foodit;
      // console.log(items);
      const productCount = items.length;
      return productCount;
    } else if (vendor.vendorType === 'homeservice') {
      const homeservice = await HomeService.find({ vendorId });
      const { items } = homeservice[0];
      // console.log(items);
      const productCount = items.length;
      return productCount;
    } else if (vendor.vendorType === 'beautyzone') {
      const beautyzone = await BeautyZone.find({ vendorId });
      const { items } = beautyzone[0];
      // console.log(items);
      const productCount = items.length;
      return productCount;
    } else if (vendor.vendorType === 'gamezone') {
      const gamezone = await GameZone.find({ vendorId });
      const { items } = gamezone[0];
      // console.log(items);
      const productCount = items.length;
      return productCount;
    }
  } catch (error) {
    return error;
  }
};

const getVendorOrdersCount = async (vendorId) => {
  console.log(vendorId);
  try {
    const orders = await Order.find({ vendorId: '5f7421d9525cc00022fe75cb' });
    // console.log(orders.length);
    const ordersCount = orders.length;
    return ordersCount;
  } catch (error) {
    return error;
  }
};

module.exports = { getVendorProductsCount, getVendorOrdersCount };
