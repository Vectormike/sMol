const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cardService } = require('../services');

const getCard = catchAsync(async (req, res) => {
  const card = await cardService.getCard();
  res.json({ card });
});

const createCard = catchAsync(async (req, res) => {
  const card = await cardService.createCard({ ...req.body, user: req.user.id });
  res.json({ card });
});

const deleteCard = catchAsync(async (req, res) => {
  await cardService.deleteCard(req.params);
  res.status(httpStatus.OK).end();
});

module.exports = { getCard, createCard, deleteCard };
