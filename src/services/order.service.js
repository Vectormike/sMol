/* eslint-disable import/order */
const axios = require('axios');
const httpStatus = require('http-status');
const crypto = require('crypto');
const confiG = require('../config/config');
const paystack = require('paystack')(confiG.paystack);
const { Order, Transaction, User, Vendor } = require('../models');
const ApiError = require('../utils/ApiError');

const createOrder = async (orderBody, userId) => {
  const reference = crypto.randomBytes(5).toString('hex');
  const totalAmount = orderBody.totalAmount * 100;
  try {
    const userDetails = await User.findById(userId);
    const vendorDetails = await Vendor.findById(orderBody.vendorId);
    if (orderBody.totalAmount >= 1000) {
      const data = JSON.stringify({
        email: userDetails.email,
        amount: totalAmount,
        reference,
        subaccount: orderBody.subaccountCode,
        card: {
          cvv: orderBody.card.cvv,
          number: orderBody.card.number,
          expiry_month: orderBody.card.expiryMonth,
          expiry_year: orderBody.card.expiryYear,
        },
        pin: orderBody.pin,
      });

      const config = {
        method: 'post',
        url: 'https://api.paystack.co/charge',
        headers: {
          Authorization: `Bearer ${confiG.paystack}`,
          'Content-Type': 'application/json',
        },
        data,
      };

      const response = await axios(config);
      if (!response) throw new ApiError(httpStatus.BAD_REQUEST, 'Payment unsuccessful');
      const order = new Order({
        vendorId: orderBody.vendorId,
        shippingAddress: userDetails.homeAddress,
        shippingStatus: 'Pending',
        totalAmount,
        items: orderBody.items,
      });
      const transaction = new Transaction({
        orderId: order.id,
        status: 'Paid',
        paymentId: reference,
        shippingAddress: userDetails.homeAddress,
        paymentType: 'Card',
      });
      return { order, transaction };
    }
    if (orderBody.totalAmount < 1000) {
      const updateSubaccountResponse = await paystack.subaccount.update('ACCT_stzudtgqm66bp0z', {
        percentage_charge: 0,
      });
      if (!updateSubaccountResponse) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Percentage charge not updated');
      const data = JSON.stringify({
        email: userDetails.email,
        amount: totalAmount,
        reference,
        subaccount: vendorDetails.subaccountCode,
        card: {
          cvv: orderBody.card.cvv,
          number: orderBody.card.number,
          expiry_month: orderBody.card.expiryMonth,
          expiry_year: orderBody.card.expiryYear,
        },
        pin: orderBody.card.pin,
      });

      const config = {
        method: 'post',
        url: 'https://api.paystack.co/charge',
        headers: {
          Authorization: `Bearer ${confiG.paystack}`,
          'Content-Type': 'application/json',
        },
        data,
      };
      const response = await axios(config);
      if (!response) throw new ApiError(httpStatus.BAD_REQUEST, 'Payment unsuccessful');
      const order = new Order({
        cartId: orderBody.cartId,
        vendorId: orderBody.vendorId,
        shippingAddress: userDetails.homeAddress,
        shippingStatus: 'Pending',
        totalAmount,
        items: orderBody.items,
      });
      const transaction = new Transaction({
        orderId: order.id,
        status: 'Paid',
        paymentId: reference,
        shippingAddress: userDetails.homeAddress,
        paymentType: 'Card',
      });
      return { order, transaction };
    }
  } catch (error) {
    return error;
  }
};

// const getBeautyZones = async () => {
//     const beautyzone = await BeautyZone.find().populate('vendorId');
//     return beautyzone;
// };

// /**
//  * Update Food by id
//  * @param {ObjectId} userId
//  * @param {Object} updateBody
//  * @returns {Promise<User>}
//  */
// const updateBeautyZone = async (userId, body) => {
//     try {
//         const beautyzone = await BeautyZone.findByIdAndUpdate(userId, body, {
//             useFindAndModify: false,
//             new: true,
//         });
//         if (!beautyzone) {
//             throw new ApiError(httpStatus.NOT_FOUND, 'Food not updated');
//         }
//     } catch (error) {
//         return error;
//     }
// };

// const deleteBeautyZone = async (params) => {
//     const { id } = params;
//     try {
//         await BeautyZone.findOneAndRemove(id, { useFindAndModify: false });
//     } catch (error) {
//         return error;
//     }
// };

module.exports = { createOrder };
