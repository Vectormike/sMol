/* eslint-disable import/no-extraneous-dependencies */
const cloudinary = require('cloudinary');
const config = require('./config');

cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryKey,
  api_secret: config.cloudinarySecret,
});
