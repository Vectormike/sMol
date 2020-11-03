const axios = require('axios');
const httpStatus = require('http-status');
const { Card } = require('../models');
const ApiError = require('../utils/ApiError');
const crypto = require('crypto');
const confiG = require('../config/config');

const getAllCards = async () => {
  const card = await Card.find().populate('user');
  return card;
};

const getCard = async (id) => {
  const card = await Card.find({ user: id });
  return card;
};

const saveCard = async (cardDetails) => {
  try {
    console.log(cardDetails);
    const reference = crypto.randomBytes(3).toString('hex');

    const data = JSON.stringify({
      email: cardDetails.email,
      amount: 50,
      reference,
      // subaccount: vendorDetails.subaccountCode,
      card: {
        cvv: '408',
        number: '4084084084084081',
        expiry_month: '12',
        expiry_year: '21',
      },
      pin: '1234',
    });

    const config = {
      method: 'post',
      url: 'https://api.paystack.co/charge',
      headers: {
        Authorization: `Bearer ${confiG.paystack}`,
        'Content-Type': 'application/json',
      },
      data,
    };
    const response = await axios(config);
    // console.log(response.data);
    const {
      authorization_code,
      card_type,
      last4,
      exp_month,
      exp_year,
      bin,
      bank,
      signature,
    } = response.data.data.authorization;

    if (response.data.message === 'Charge attempted') {
      const card = await Card.create({
        user: cardDetails.user,
        email: cardDetails.email,
        authorizationCode: authorization_code,
        bin,
        last4,
        expMonth: exp_month,
        expYear: exp_year,
        cardType: card_type,
        signature,
        bank,
      });

      console.log(card);
    }
  } catch (error) {
    console.error(error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unable to save card!');
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

module.exports = { getCard, getAllCards, saveCard, deleteCard };
