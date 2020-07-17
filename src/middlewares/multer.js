/* eslint-disable arrow-parens */
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary');
// const cloudinaryStorage = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'uploads',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
});

const upload = multer({ storage });

module.exports = { upload };
