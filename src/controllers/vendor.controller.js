const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { vendorService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const vendor = await vendorService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(vendor);
  await emailService.sendWelcomeEmail(vendor);
  res.status(httpStatus.CREATED).json({ vendor, tokens });
});

const updateVendor = catchAsync(async (req, res) => {
  const user = await vendorService.updateVendorById(req.params.userId, req.body);
  res.json({ user });
});

module.exports = {
  register,
  updateVendor,
};
