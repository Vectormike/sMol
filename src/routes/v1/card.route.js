const express = require('express');
const auth = require('../../middlewares/auth');
const cardController = require('../../controllers/card.controller');

const router = express.Router();

router.route('/').get(auth(), cardController.getCard);
router.route('/').post(auth('user'), cardController.createCard);
router.route('/:id').delete(auth('vendor'), cardController.deleteCard);

module.exports = router;
