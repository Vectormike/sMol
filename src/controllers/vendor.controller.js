const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { vendorService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const vendor = await vendorService.createVendor(req.body);
  const tokens = await tokenService.generateAuthTokens(vendor);
  await emailService.sendWelcomeEmail(vendor);
  res.status(httpStatus.CREATED).json({ vendor, tokens });
});

const updateVendor = catchAsync(async (req, res) => {
  const vendor = await vendorService.updateVendorById(req.params.vendorId, req.body);
  res.json({ vendor });
});

const getVendorServices = catchAsync(async (req, res) => {
  const { foodServices, beautyServices, homeServices, gameServices } = await vendorService.getVendorServices(req.user.id);
  res.json({ foodServices, beautyServices, homeServices, gameServices });
});

module.exports = {
  register,
  updateVendor,
  getVendorServices,
};
