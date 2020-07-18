const httpStatus = require('http-status');
const CreditCard = require('node-creditcard');
const { Card } = require('../models');
const ApiError = require('../utils/ApiError');

const getCard = async () => {
  const card = await Card.find().populate('user');
  return card;
};

const createCard = async (cardBody) => {
  try {
    const creditcard = new CreditCard(cardBody);
    const valid = creditcard.isValid();
    const data = creditcard.getSafeData();
    const validation = creditcard.validate();
    const { brand, validCardNumber, validHolder, validCvv, validExpiration, isExpired } = validation;
    if (
      validCardNumber === true &&
      isExpired === false &&
      validHolder === true &&
      validCvv === true &&
      validExpiration === true
    ) {
      const card = await Card.create(cardBody);
      return { valid, card, data };
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Card is invalid');
  } catch (error) {
    return error;
  }
};
const deleteCard = async (params) => {
  const { id } = params;
  try {
    await Card.findOneAndRemove(id, { useFindAndModify: false });
  } catch (error) {
    return error;
  }
};

module.exports = { getCard, createCard, deleteCard };
