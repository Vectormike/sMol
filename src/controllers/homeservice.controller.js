const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { homeserviceService } = require('../services');

const createHomeService = catchAsync(async (req, res) => {
  const homeservice = await homeserviceService.createHomeService({ ...req.body, vendorId: req.user._id });
  res.status(httpStatus.CREATED).json({ homeservice });
});

const getHomeService = catchAsync(async (req, res) => {
  const homeservice = await homeserviceService.getHomeService();
  res.status(httpStatus.CREATED).json({ homeservice });
});

const updateHomeService = catchAsync(async (req, res) => {
  const homeservice = await homeserviceService.updateHomeService(req.params.id, req.body);
  res.status(httpStatus.CREATED).json({ homeservice });
});

const deleteHomeService = catchAsync(async (req, res) => {
  await homeserviceService.deleteHomeService(req.params, req.body);
  res.status(httpStatus.OK).end();
});

module.exports = { createHomeService, getHomeService, updateHomeService, deleteHomeService };
