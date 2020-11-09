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

    // Charge card and get authorization code
    let data = JSON.stringify({
      email: cardDetails.email,
      amount: 50 * 100,
      reference,
      card: {
        cvv: cardDetails.card.cvv,
        number: cardDetails.card.number,
        expiry_month: cardDetails.card.expMonth,
        expiry_year: cardDetails.card.expYear,
      },
      pin: cardDetails.pin,
    });

    let config = {
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

    //Refund the value back to user after verification
    if (response.data.message === 'Charge attempted') {
      data = JSON.stringify({
        amount: 50 * 100,
        transaction: reference,
      });

      config = {
        method: 'post',
        url: 'https://api.paystack.co/refund',
        headers: {
          Authorization: `Bearer ${confiG.paystack}`,
          'Content-Type': 'application/json',
        },
        data,
      };
      const res = await axios(config);
      // console.log(res);
    }

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

    //Check if card is already saved
    const cardExist = await Card.findOne({ signature: signature });

    if (!cardExist) {
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

        // console.log(card);
        return card;
      }
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    console.error(error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Card is already saved on our system!');
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
