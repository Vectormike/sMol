const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');

const vendorImageUpload = catchAsync(async (req, res) => {
  const vendorImageLink = await uploadService.vendorImageUpload(req.file);
  res.json({ vendorImageLink });
});

const itemImageUpload = catchAsync(async (req, res) => {
  const itemImageLink = await uploadService.itemImageUpload(req.file);
  res.json({ itemImageLink });
});

module.exports = { vendorImageUpload, itemImageUpload };
