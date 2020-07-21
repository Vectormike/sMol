const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');

const uploadVendorImage = catchAsync(async (req, res) => {
  const vendor = await uploadService.uploadVendorImage(req.params.id, req.file);
  res.json({ vendor });
});

const uploadItemImage = catchAsync(async (req, res) => {
  const item = await uploadService.uploadItemImage(req.params.id, req.file);
  res.json({ item });
});

module.exports = { uploadVendorImage, uploadItemImage };
