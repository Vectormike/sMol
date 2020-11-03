const express = require('express');
const auth = require('../../middlewares/auth');
const cardController = require('../../controllers/card.controller');

const router = express.Router();

router.route('/').get(auth('user'), cardController.getCard);
router.route('/').get(auth(), cardController.getAllCards);
router.route('/saveCard').post(auth('user'), cardController.saveCard);
router.route('/:id').delete(auth('user'), cardController.deleteCard);

module.exports = router;
