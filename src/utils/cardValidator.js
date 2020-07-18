const CreditCard = require('node-creditcard');

const validateCreditCard = async (cardBody) => {
  const creditcard = new CreditCard(cardBody);
  const valid = creditcard.isValid();
  const data = creditcard.getSafeData();
  const validation = creditcard.validate();
  return { validation, data, valid };
};

module.exports = validateCreditCard;
