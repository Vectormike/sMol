const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { geolocationService } = require('../services');

const getUserLocationInformation = catchAsync(async (req, res) => {
  const result = await geolocationService.getUserLocationInformation(req.query);
  res.status(httpStatus.CREATED).json({ result });
});

module.exports = {
  getUserLocationInformation,
};
