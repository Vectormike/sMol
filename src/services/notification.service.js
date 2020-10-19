const { User, Vendor } = require('../models/index');
const { sendToDevice } = require('./pushNotification/pushNotification.service');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const sendNotificationToUser = async (body, userId) => {
  try {
    const user = await User.findById(userId);
    const { title, content } = body;
    const data = { title, content };
    const fcmToken = user.fcmToken;
    fcmToken === null ? console.log('No fcmToken') : sendToDevice(fcmToken, data, 'user');
  } catch (error) {
    console.error(error, 'Notification error');
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Notification not sent');
  }
};

const sendNotificationToVendor = async (body, userId) => {
  try {
    const vendor = await Vendor.findById(userId);
    // console.log(vendor, 'Vendor');
    const { title, content } = body;
    const data = { title, content };
    const fcmToken = vendor.fcmToken;
    fcmToken === null ? console.log('No fcmToken') : sendToDevice(fcmToken, data, 'vendor');
  } catch (error) {
    console.error(error, 'Notification error');
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Notification not sent');
  }
};

module.exports = { sendNotificationToUser, sendNotificationToVendor };
