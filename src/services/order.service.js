/* eslint-disable no-console */
/* eslint-disable import/order */
const axios = require('axios');
const httpStatus = require('http-status');
const crypto = require('crypto');
const confiG = require('../config/config');
const paystack = require('paystack')(confiG.paystack);
const {} = require('./card.service');
const notificationService = require('../services/notification.service');
const { Order, Transaction, User, Vendor, Cart, Card } = require('../models');
const ApiError = require('../utils/ApiError');

const getAllOrders = async () => {
  const orders = await Order.find().populate('cartId').populate('transactionId').populate('vendorId').exec();
  return orders;
};

const getUserOrders = async (userId) => {
  const orders = await Order.find({ user: userId }).populate('cartId').populate('transactionId').populate('vendorId').exec();
  return orders;
};

const getVendorOrders = async (userId) => {
  const orders = await Order.find({ vendorId: userId })
    .populate('cartId')
    .populate('transactionId')
    .populate('vendorId')
    .populate('user')
    .exec();
  return orders;
};

const createOrder = async (orderBody, userId) => {
  const reference = crypto.randomBytes(5).toString('hex');
  try {
    const userDetails = await User.findById(userId);
    const vendorDetails = await Vendor.findById(orderBody.vendorId);
    const cartDetails = await Cart.findById(orderBody.cartId);
    const cardDetails = await Card.findOne({ user: userId });
    const totalAmount = cartDetails.totalAmount * 100;

    // For items more than N1000, add default subcharge
    if (cartDetails.totalAmount >= 1000) {
      const data = JSON.stringify({
        email: cardDetails.email,
        amount: totalAmount,
        reference,
        subaccount: vendorDetails.subaccountCode,
        authorization_code: cardDetails.authorizationCode,
      });

      const config = {
        method: 'post',
        url: 'https://api.paystack.co/transaction/charge_authorization',
        headers: {
          Authorization: `Bearer ${confiG.paystack}`,
          'Content-Type': 'application/json',
        },
        data,
      };
      const response = await axios(config);
      if (!response) throw new ApiError(httpStatus.BAD_REQUEST, 'Payment unsuccessful');

      // Shipping address provided just when about to make payment
      if (orderBody.shippingAddress) {
        const order = await Order.create({
          cartId: orderBody.cartId,
          vendorId: orderBody.vendorId,
          user: userId,
          shippingAddress: orderBody.shippingAddress,
          shippingStatus: 'Pending',
          totalAmount: cartDetails.totalAmount,
          items: cartDetails.items,
          paymentId: reference,
        });
        const transaction = await Transaction.create({
          orderId: order.id,
          status: 'Paid',
          paymentId: reference,
          shippingAddress: orderBody.shippingAddress,
          shipToFriend: orderBody.shipToFriend,
          paymentType: 'Card',
        });
        const updatedOrder = await Order.findByIdAndUpdate(
          order.id,
          { transactionId: transaction.id },
          {
            useFindAndModify: false,
            new: true,
          }
        );
        const user = await User.findById(order.user);
        const body = {
          title: 'Order Completed!',
          content: `Hey ${user.firstName}, thanks for using Servit.`,
        };
        notificationService.sendNotificationToUser(body, order.user);
        return { updatedOrder, transaction };
      }

      // Shipping address from user details
      const order = await Order.create({
        cartId: orderBody.cartId,
        user: userId,
        vendorId: orderBody.vendorId,
        shippingAddress: userDetails.homeAddress,
        shippingStatus: 'Pending',
        totalAmount: cartDetails.totalAmount,
        items: cartDetails.items,
        paymentId: reference,
      });
      const transaction = await Transaction.create({
        orderId: order.id,
        status: 'Paid',
        paymentId: reference,
        shippingAddress: userDetails.homeAddress,
        shipToFriend: orderBody.shipToFriend,
        paymentType: 'Card',
      });
      const updatedOrder = await Order.findByIdAndUpdate(
        order.id,
        { transactionId: transaction.id },
        {
          useFindAndModify: false,
          new: true,
        }
      );
      const user = await User.findById(order.user);
      const body = {
        title: 'Order Completed!',
        content: `Hey ${user.firstName}, thanks for using Servit.`,
      };
      notificationService.sendNotificationToUser(body, order.user);
      return { updatedOrder, transaction };
    }

    // For items less than N1000, remove subcharge
    if (cartDetails.totalAmount < 1000) {
      const updateSubaccountResponse = await paystack.subaccount.update('ACCT_stzudtgqm66bp0z', {
        percentage_charge: 0,
      });
      if (!updateSubaccountResponse) throw new Error();
      const data = JSON.stringify({
        email: cardDetails.email,
        amount: totalAmount,
        reference,
        subaccount: vendorDetails.subaccountCode,
        authorization_code: cardDetails.authorizationCode,
      });

      const config = {
        method: 'post',
        url: 'https://api.paystack.co/transaction/charge_authorization',
        headers: {
          Authorization: `Bearer ${confiG.paystack}`,
          'Content-Type': 'application/json',
        },
        data,
      };
      const response = await axios(config);
      if (!response) throw new ApiError(httpStatus.BAD_REQUEST, 'Payment unsuccessful');

      if (orderBody.shippingAddress) {
        const order = await Order.create({
          cartId: orderBody.cartId,
          vendorId: orderBody.vendorId,
          shippingAddress: orderBody.shippingAddress,
          user: userId,
          shippingStatus: 'Pending',
          totalAmount: cartDetails.totalAmount,
          items: cartDetails.items,
          paymentId: reference,
        });
        const transaction = await Transaction.create({
          orderId: order.id,
          status: 'Paid',
          paymentId: reference,
          shippingAddress: orderBody.shippingAddress,
          paymentType: 'Card',
        });
        const updatedOrder = await Order.findByIdAndUpdate(
          order.id,
          { transactionId: transaction.id },
          {
            useFindAndModify: false,
            new: true,
          }
        );
        const user = await User.findById(order.user);
        const body = {
          title: 'Order Completed!',
          content: `Hey ${user.firstName}, thanks for using Servit.`,
        };
        notificationService.sendNotificationToUser(body, order.user);
        return { updatedOrder, transaction };
      }
      const order = await Order.create({
        cartId: orderBody.cartId,
        user: userId,
        vendorId: orderBody.vendorId,
        paymentId: reference,
        shippingAddress: userDetails.homeAddress,
        shippingStatus: 'Pending',
        totalAmount: cartDetails.totalAmount,
        items: orderBody.items,
      });
      const transaction = await Transaction.create({
        orderId: order.id,
        status: 'Paid',
        paymentId: reference,
        shippingAddress: userDetails.homeAddress,
        paymentType: 'Card',
      });
      const updatedOrder = await Order.findByIdAndUpdate(
        order.id,
        { transactionId: transaction.id },
        {
          useFindAndModify: false,
          new: true,
        }
      );
      const user = await User.findById(order.user);
      const body = {
        title: 'Order Completed!',
        content: `Hey ${user.firstName}, thanks for using Servit.`,
      };
      notificationService.sendNotificationToUser(body, order.user);
      return { updatedOrder, transaction };
    }
  } catch (error) {
    console.error(error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Order not made!');
  }
};

const acceptOrder = async (orderId) => {
  try {
    const orderDetails = await Order.findByIdAndUpdate(
      orderId,
      { shippingStatus: 'Accepted' },
      {
        useFindAndModify: false,
        new: true,
      }
    );

    const user = await User.findById(orderDetails.user);
    const body = {
      title: 'Order has been accepted',
      content: `Hello ${user.firstName}, your order has been accepted and will begin processing.`,
    };
    notificationService.sendNotificationToUser(body, orderDetails.user);
    return { orderDetails };
  } catch (error) {
    return error;
  }
};

const shipOrder = async (orderId) => {
  try {
    const orderDetails = await Order.findByIdAndUpdate(
      orderId,
      { shippingStatus: 'Shipped' },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    const user = await User.findById(orderDetails.user);
    const body = {
      title: 'Order en route!',
      content: `Hello ${user.firstName}, your order has just been shipped and will get to you soonest.`,
    };
    notificationService.sendNotificationToUser(body, orderDetails.user);
    return { orderDetails };
  } catch (error) {
    return error;
  }
};

const deliverOrder = async (orderId) => {
  try {
    const orderDetails = await Order.findByIdAndUpdate(
      orderId,
      { shippingStatus: 'Delivered' },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    const user = await User.findById(orderDetails.user);
    const body = {
      title: 'Order Delivered',
      content: `Yo ${user.firstName}, got your order? If not, contact us now.`,
    };
    notificationService.sendNotificationToUser(body, orderDetails.user);
    return { orderDetails };
  } catch (error) {
    return error;
  }
};

const cancelOrder = async (orderId) => {
  try {
    const orderDetails = await Order.findById(orderId);
    // console.log(orderDetails);
    if (!orderDetails) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }

    const data = JSON.stringify({
      transaction: orderDetails.paymentId,
    });

    const config = {
      method: 'post',
      url: 'https://api.paystack.co/refund',
      headers: {
        Authorization: `Bearer ${confiG.paystack}`,
        'Content-Type': 'application/json',
      },
      data,
    };
    const response = await axios(config);
    if (!response) throw new ApiError(httpStatus.BAD_REQUEST, 'Refund unsuccessful');
    const transaction = await Transaction.findByIdAndUpdate(
      orderDetails.transactionId,
      { status: 'Refund' },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    const newOrderDetails = await Order.findByIdAndUpdate(
      orderId,
      { shippingStatus: 'Cancelled' },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    const refund = response.data;

    const user = await User.findById(orderDetails.user);
    const body = {
      title: 'Order Cancelled',
      content: `Yo ${user.firstName}, we just cancelled your order.`,
    };
    notificationService.sendNotificationToUser(body, orderDetails.user);
    return { refund, newOrderDetails, transaction };
  } catch (error) {
    return error;
  }
};

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
