const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, vendorService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).json({ user, tokens });
});

const registerVendor = catchAsync(async (req, res) => {
  const vendor = await vendorService.createVendor(req.body);
  const tokens = await tokenService.generateAuthTokens(vendor);
  res.status(httpStatus.CREATED).json({ vendor, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.json({ user, tokens });
});

const loginVendor = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const vendor = await authService.loginVendorWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(vendor);
  res.json({ vendor, tokens });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.json({ ...tokens });
});

const refreshVendorTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshVendorAuth(req.body.refreshToken);
  res.json({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.json({ resetPasswordToken });
});

const forgotVendorPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateVendorResetPasswordToken(req.body.email);
  // await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.json({ resetPasswordToken });
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetVendorPassword = catchAsync(async (req, res) => {
  await authService.resetVendorPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const changePassword = catchAsync(async (req, res) => {
  await authService.changePassword(req.user, req.body);
  res.json({});
});

const changeVendorPassword = catchAsync(async (req, res) => {
  await authService.changeVendorPassword(req.user, req.body);
  res.json({});
});

module.exports = {
  register,
  registerVendor,
  login,
  loginVendor,
  refreshTokens,
  refreshVendorTokens,
  forgotPassword,
  forgotVendorPassword,
  resetPassword,
  resetVendorPassword,
  changePassword,
  changeVendorPassword,
};
