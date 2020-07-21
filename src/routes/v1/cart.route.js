const express = require('express');
const auth = require('../../middlewares/auth');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

router.route('/').get(auth('user'), cartController.getCart);
// router.route('/').get(auth(), cardController.getAllCards);
router.route('/').post(auth('user'), cartController.createCart);
router.route('/:id').post(auth('user'), cartController.removeItem);

module.exports = router;
