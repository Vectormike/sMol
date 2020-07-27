const express = require('express');
const auth = require('../../middlewares/auth');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router.route('/').get(orderController.getAllOrders);
router.route('/').get(auth('user'), orderController.getOrders);
router.route('/').post(auth('user'), orderController.createOrder);
router.route('/:orderId').post(auth('user'), orderController.refundOrder);
router.route('/:id').post(auth('vendor'), orderController.shipOrder);

module.exports = router;
