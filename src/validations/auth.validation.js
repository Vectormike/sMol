const Joi = require('@hapi/joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const registerVendor = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().required().custom(password),
    businessName: Joi.string().required(),
    bank: Joi.string().required(),
    accountNumber: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    fcmToken: Joi.string().required(),
  }),
};

const loginVendor = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    fcmToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  register,
  registerVendor,
  login,
  loginVendor,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
