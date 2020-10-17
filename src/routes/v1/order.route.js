const express = require('express');
const auth = require('../../middlewares/auth');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router.route('/').get(orderController.getAllOrders);
router.route('/user').get(auth('user'), orderController.getUserOrders);
router.route('/vendor').get(auth('vendor'), orderController.getVendorOrders);
router.route('/').post(auth('user'), orderController.createOrder);
router.route('/:id').patch(auth('vendor'), orderController.shipOrder);
router.route('/:id').patch(auth('vendor'), orderController.deliverOrder);
router.route('/:orderId').post(auth('vendor'), orderController.cancelOrder);

module.exports = router;
