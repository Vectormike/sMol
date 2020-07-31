const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');

const imageUpload = catchAsync(async (req, res) => {
  const imageLink = await uploadService.imageUpload(req.file);
  res.json({ imageLink });
});

module.exports = { imageUpload };
