const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { itemService } = require('../services');

const createItem = catchAsync(async (req, res) => {
  const item = await itemService.createItem({ ...req.body, vendorId: req.user._id });
  res.status(httpStatus.CREATED).json({ item });
});

const getItemService = catchAsync(async (req, res) => {
  const item = await itemService.getItemById(req.params.id);
  res.status(httpStatus.CREATED).json({ item });
});

const getAllItemsService = catchAsync(async (req, res) => {
  const items = await itemService.getItems();
  res.status(httpStatus.CREATED).json({ items });
});

const updateItem = catchAsync(async (req, res) => {
  const item = await itemService.updateItem(req.params.id, req.body);
  res.status(httpStatus.CREATED).json({ item });
});

const deleteHomeService = catchAsync(async (req, res) => {
  await homeserviceService.deleteHomeService(req.params, req.body);
  res.status(httpStatus.OK).end();
});

module.exports = { createItem, getItemService, getAllItemsService, updateItem, deleteHomeService };
