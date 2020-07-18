const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cardService } = require('../services');

const createCard = catchAsync(async (req, res) => {
  const card = await cardService.createCard({ ...req.body, user: req.user.id });
  res.json({ card });
});

module.exports = { createCard };
