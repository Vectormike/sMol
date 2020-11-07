const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cardService } = require('../services');

const getAllCards = catchAsync(async (req, res) => {
  const card = await cardService.getCard();
  res.json({ card });
});

const getCard = catchAsync(async (req, res) => {
  const card = await cardService.getCard(req.user.id);
  res.json({ card });
});

const saveCard = catchAsync(async (req, res) => {
  console.log(req.body);
  const card = await cardService.saveCard({ ...req.body, user: req.user.id, email: req.user.email });
  res.json({ card });
});

const deleteCard = catchAsync(async (req, res) => {
  await cardService.deleteCard(req.params);
  res.status(httpStatus.OK).end();
});

module.exports = { getCard, getAllCards, saveCard, deleteCard };
