const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

// router.route('/').get(auth(), fooditController.getFoods);
router.route('/').post(auth('user'), orderController.createOrder);
router.route('/:id').delete(auth('user'), orderController.refundOrder);

module.exports = router;
